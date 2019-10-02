import React from "react";
import { ThingModel } from "../../../store/things/interfaces";
import { Controls } from "../Controls/Controls";
import { Card } from "../../Elements/Card/Card";

type Props = {
  thing: ThingModel;
};

export const ThingElement: React.FC<Props> = React.memo(({ thing }) => (
  <Card
    onDelete={() => {
      console.log(thing.id);
    }}
    title={thing.title}
  >
    {thing.values && <Controls {...thing} />}
  </Card>
));
