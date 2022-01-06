import { default as TreeAddress } from './TreeAddress';
import { formDecorator } from "./storyUtils";

export default {
  title: 'AddTree/TreeAddress',
  component: TreeAddress,
};

const Template = (args) => <TreeAddress {...args} />;

export const Default = Template.bind({});
Default.decorators = [formDecorator];
