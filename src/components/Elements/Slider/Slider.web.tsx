import React from "react";
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  I18nManager,
  PanResponderInstance,
  PanResponderGestureState,
  SliderProps,
  PanResponderCallbacks,
  LayoutChangeEvent,
  ViewStyle,
  LayoutRectangle
} from "react-native";

const applyNativeMethods = require("react-native-web/dist/modules/applyNativeMethods")
  .default;
const TRACK_SIZE = 4;
const THUMB_SIZE = 20;
const THUMB_TOUCH_SIZE = 40;

type ANIMATION_TYPES = "spring" | "timing";

const DEFAULT_ANIMATION_CONFIGS: Record<ANIMATION_TYPES, any> = {
  spring: {
    friction: 7,
    tension: 100
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0
  }
};

interface SliderComponentProps extends SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step: number;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
  debugTouchArea: boolean;
  animationType: ANIMATION_TYPES;
  animateTransitions: boolean;
  animationConfig: any;
  onSlidingStart(): void;
}

class Slider extends React.Component<SliderComponentProps> {
  _panResponder: PanResponderInstance | null = null;
  _previousLeft: number | null = null;
  _store: {
    [key: string]: { width: number; height: number; [x: string]: number };
  } = {};

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0,
    minimumTrackTintColor: "#009688",
    maximumTrackTintColor: "#939393",
    debugTouchArea: false,
    animationType: "timing",
    animateTransitions: false
  };

  state = {
    containerSize: { width: 0, height: 0 },
    trackSize: { width: 0, height: 0 },
    thumbSize: { width: 0, height: 0 },
    allMeasured: false,
    animatedValue: new Animated.Value(this.props.value)
  };

  constructor(props: SliderComponentProps) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
  }

  componentWillReceiveProps(nextProps: SliderComponentProps) {
    const newValue = nextProps.value;

    if (this.props.value !== newValue) {
      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this._setCurrentValue(newValue);
      }
    }
  }

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      style,
      debugTouchArea,
      animationType,
      ...other
    } = this.props;
    const { containerSize, thumbSize, allMeasured } = this.state;
    const thumbLeft = this.state.animatedValue.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: I18nManager.isRTL
        ? [0, -(containerSize.width - thumbSize.width)]
        : [0, containerSize.width - thumbSize.width]
      // extrapolate: 'clamp',
    });
    const minimumTrackWidth = this.state.animatedValue.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width]
      //extrapolate: 'clamp',
    });

    const valueVisibleStyle: ViewStyle = {};
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const minimumTrackStyle = {
      position: "absolute",
      width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle
    };

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <View
        {...other}
        onLayout={this._measureContainer}
        style={[defaultStyles.container, style]}
      >
        <View
          onLayout={this._measureTrack}
          style={[
            { backgroundColor: maximumTrackTintColor },
            defaultStyles.track
          ]}
        />
        <Animated.View style={[defaultStyles.track, minimumTrackStyle]} />
        <Animated.View
          onLayout={this._measureThumb}
          style={[
            { backgroundColor: thumbTintColor || minimumTrackTintColor },
            defaultStyles.thumb,
            {
              transform: [{ translateX: thumbLeft }, { translateY: 0 }],
              ...valueVisibleStyle
            }
          ]}
        />
        <View
          style={[defaultStyles.touchArea, touchOverflowStyle]}
          {...this._panResponder!.panHandlers}
        >
          {debugTouchArea === true &&
            this._renderDebugThumbTouchRect(thumbLeft)}
        </View>
      </View>
    );
  }

  _getPropsForComponentUpdate(props: SliderComponentProps) {
    /* eslint-disable */
    const {
      value,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      style,
      ...otherProps
    } = props;

    return otherProps;
    /* eslint-enable */
  }

  _handleStartShouldSetPanResponder: PanResponderCallbacks["onStartShouldSetPanResponder"] = (
    e,
    gestureState
  ) => {
    // Should we become active when the user presses down on the thumb?
    return this._thumbHitTest!(e, gestureState);
  };

  _handleMoveShouldSetPanResponder(/*e: Object, gestureState: Object*/): boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  }

  _handlePanResponderGrant: PanResponderCallbacks["onPanResponderGrant"] = (
    _e,
    _gestureState
  ) => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    if (this.props.onSlidingStart) {
      this.props.onSlidingStart();
    }
  };

  _handlePanResponderMove: PanResponderCallbacks["onPanResponderMove"] = (
    _e,
    gestureState
  ) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    if (this.props.onValueChange) {
      this.props.onValueChange(this._getCurrentValue());
    }
  };

  _handlePanResponderRequestEnd() {
    // Should we allow another component to take over this pan?
    return false;
  }

  _handlePanResponderEnd: PanResponderCallbacks["onPanResponderEnd"] = (
    e,
    gestureState
  ) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    if (this.props.onSlidingComplete) {
      this.props.onSlidingComplete(this._getCurrentValue());
    }
  };

  _measureContainer = (x: LayoutChangeEvent) => {
    this._handleMeasure("containerSize", x);
  };

  _measureTrack = (x: LayoutChangeEvent) => {
    this._handleMeasure("trackSize", x);
  };

  _measureThumb = (x: LayoutChangeEvent) => {
    this._handleMeasure("thumbSize", x);
  };

  _handleMeasure = (name: string, x: LayoutChangeEvent) => {
    const { width, height } = x.nativeEvent.layout;
    const size = { width: width, height: height };

    const currentSize = this._store[name];
    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return;
    }
    this._store[name] = size;

    const store = this._store;
    if (store.containerSize && store.trackSize && store.thumbSize) {
      this.setState({
        ...this.state,
        containerSize: store.containerSize,
        trackSize: store.trackSize,
        thumbSize: store.thumbSize,
        allMeasured: true
      });
    }
  };

  _getRatio = (value: number) => {
    return (
      (value - this.props.minimumValue) /
      (this.props.maximumValue - this.props.minimumValue)
    );
  };

  _getThumbLeft = (value: number) => {
    const nonRtlRatio = this._getRatio(value);
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
    return (
      ratio * (this.state.containerSize.width - this.state.thumbSize.width)
    );
  };

  _getValue = (gestureState: PanResponderGestureState) => {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft! + gestureState.dx;

    const nonRtlRatio = thumbLeft / length;
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

    if (this.props.step) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          this.props.minimumValue +
            Math.round(
              (ratio * (this.props.maximumValue - this.props.minimumValue)) /
                this.props.step
            ) *
              this.props.step
        )
      );
    }
    return Math.max(
      this.props.minimumValue,
      Math.min(
        this.props.maximumValue,
        ratio * (this.props.maximumValue - this.props.minimumValue) +
          this.props.minimumValue
      )
    );
  };

  _getCurrentValue = (): number => {
    const val = (this.state.animatedValue as any)._value;
    return val;
  };

  _setCurrentValue = (value: number) => {
    this.state.animatedValue.setValue(value);
  };

  _setCurrentValueAnimated = (value: number) => {
    const animationType = this.props.animationType;

    const animationConfig = {
      ...DEFAULT_ANIMATION_CONFIGS[animationType],
      toValue: value
    };

    Animated[animationType](this.state.animatedValue, animationConfig).start();
  };

  _getTouchOverflowSize = () => {
    const { allMeasured, thumbSize, containerSize } = this.state;

    const size: Partial<LayoutRectangle> = {};
    if (allMeasured === true) {
      size.width = Math.max(0, THUMB_TOUCH_SIZE - thumbSize.width);
      size.height = Math.max(0, THUMB_TOUCH_SIZE - containerSize.height);
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    const { width, height } = this._getTouchOverflowSize();

    const touchOverflowStyle: ViewStyle = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = "orange";
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  };

  _thumbHitTest: PanResponderCallbacks["onStartShouldSetPanResponderCapture"] = ({
    nativeEvent
  }) => {
    const thumbTouchRect = this._getThumbTouchRect();
    const offset = getOffset();
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX - offset.x,
      nativeEvent.locationY - offset.y
    );
  };

  _getThumbTouchRect = () => {
    const { thumbSize, containerSize } = this.state;
    const { width = 0, height = 0 } = this._getTouchOverflowSize();

    return new Rect(
      width / 2 +
        this._getThumbLeft(this._getCurrentValue()) +
        (thumbSize.width - THUMB_TOUCH_SIZE) / 2,
      height / 2 + (containerSize.height - THUMB_TOUCH_SIZE) / 2,
      THUMB_TOUCH_SIZE,
      THUMB_TOUCH_SIZE
    );
  };

  _renderDebugThumbTouchRect = (thumbLeft: Animated.AnimatedInterpolation) => {
    const thumbTouchRect = this._getThumbTouchRect();
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height
    };

    return (
      <Animated.View
        pointerEvents="none"
        style={[defaultStyles.debugThumbTouchArea, positionStyle]}
      />
    );
  };
}

const defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center"
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  },
  touchArea: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  debugThumbTouchArea: {
    position: "absolute",
    backgroundColor: "green",
    opacity: 0.5
  }
});

export default applyNativeMethods(Slider);

class Rect implements LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  containsPoint(x: number, y: number) {
    return (
      x >= this.x &&
      y >= this.y &&
      x <= this.x + this.width &&
      y <= this.y + this.height
    );
  }
}

function getOffset() {
  if (document.documentElement && document.documentElement.scrollTop) {
    // Explorer 6 Strict
    return {
      x: document.documentElement.scrollLeft,
      y: document.documentElement.scrollTop
    };
  }
  // all other Explorers
  return { x: document.body.scrollLeft, y: document.body.scrollTop };
}
