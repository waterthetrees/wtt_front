import { default as TreePlanter } from './TreePlanter';
import { formDecorator } from "./storyUtils";

export default {
  title: 'AddTree/TreePlanter',
  component: TreePlanter,
};

const Template = (args) => <TreePlanter {...args} />;

export const Default = Template.bind({});
Default.decorators = [formDecorator];
