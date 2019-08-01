import React from "react";
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  I18nManager
} from "react-native";

import applyNativeMethods from "react-native-web/dist/modules/applyNativeMethods";

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;
const THUMB_TOUCH_SIZE = 40;

const DEFAULT_ANIMATION_CONFIGS = {
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

class Slider extends React.Component {
  _panResponder: PanResponder;
  _previousLeft: number;
  _store: {
    [key: string]: { width: number; height: number; [x: string]: any };
  } = {};

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0,
    minimumTrackTintColor: "#009688",
    maximumTrackTintColor: "#939393",
    debugTouchArea: false,
    animationType: "timing"
  };

  state = {
    containerSize: { width: 0, height: 0 },
    trackSize: { width: 0, height: 0 },
    thumbSize: { width: 0, height: 0 },
    allMeasured: false
  };

  _value = new Animated.Value(this.props.value);

  constructor(props) {
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

  componentWillReceiveProps(nextProps) {
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
      /* eslint-disable */
      animationType,
      /* eslint-enable */
      ...other
    } = this.props;
    const { containerSize, thumbSize, allMeasured } = this.state;
    const thumbLeft = this._value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: I18nManager.isRTL
        ? [0, -(containerSize.width - thumbSize.width)]
        : [0, containerSize.width - thumbSize.width]
      // extrapolate: 'clamp',
    });
    const minimumTrackWidth = this._value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width]
      //extrapolate: 'clamp',
      // extrapolate: 'clamp',
    });

    const valueVisibleStyle = {};
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
          {...this._panResponder.panHandlers}
        >
          {debugTouchArea === true &&
            this._renderDebugThumbTouchRect(thumbLeft)}
        </View>
      </View>
    );
  }

  _getPropsForComponentUpdate(props) {
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

  _handleStartShouldSetPanResponder = (
    e: Object,
    gestureState: Object
  ): boolean => {
    // Should we become active when the user presses down on the thumb?
    return this._thumbHitTest(e, gestureState);
  };

  _handleMoveShouldSetPanResponder(/*e: Object, gestureState: Object*/): boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  }

  _handlePanResponderGrant = (/*e: Object, gestureState: Object*/) => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent("onSlidingStart");
  };

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent("onValueChange");
  };

  _handlePanResponderRequestEnd(e: Object, gestureState: Object) {
    // Should we allow another component to take over this pan?
    return false;
  }

  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent("onSlidingComplete");
  };

  _measureContainer = (x: Object) => {
    this._handleMeasure("containerSize", x);
  };

  _measureTrack = (x: Object) => {
    this._handleMeasure("trackSize", x);
  };

  _measureThumb = (x: Object) => {
    this._handleMeasure("thumbSize", x);
  };

  _handleMeasure = (name: string, x: Object) => {
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

  _getValue = (gestureState: Object) => {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft + gestureState.dx;

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

  _getCurrentValue = () => this._value.__getValue();

  _setCurrentValue = (value: number) => {
    this._value.setValue(value);
  };

  _setCurrentValueAnimated = (value: number) => {
    const animationType = this.props.animationType;
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType],
      this.props.animationConfig,
      { toValue: value }
    );

    Animated[animationType](this._value, animationConfig).start();
  };

  _fireChangeEvent = event => {
    if (this.props[event]) {
      this.props[event](this._getCurrentValue());
    }
  };

  _getTouchOverflowSize = () => {
    const { state } = this;

    const size = {};
    if (state.allMeasured === true) {
      size.width = Math.max(0, THUMB_TOUCH_SIZE - state.thumbSize.width);
      size.height = Math.max(0, THUMB_TOUCH_SIZE - state.containerSize.height);
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    const { width, height } = this._getTouchOverflowSize();

    const touchOverflowStyle = {};
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

  _thumbHitTest = ({ nativeEvent }: Object) => {
    const thumbTouchRect = this._getThumbTouchRect();
    const offset = getOffset();
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX - offset.x,
      nativeEvent.locationY - offset.y
    );
  };

  _getThumbTouchRect = () => {
    const { state } = this;
    const touchOverflowSize = this._getTouchOverflowSize();

    return new Rect(
      touchOverflowSize.width / 2 +
        this._getThumbLeft(this._getCurrentValue()) +
        (state.thumbSize.width - THUMB_TOUCH_SIZE) / 2,
      touchOverflowSize.height / 2 +
        (state.containerSize.height - THUMB_TOUCH_SIZE) / 2,
      THUMB_TOUCH_SIZE,
      THUMB_TOUCH_SIZE
    );
  };

  _renderDebugThumbTouchRect = thumbLeft => {
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

class Rect {
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
