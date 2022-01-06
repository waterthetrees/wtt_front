import { default as TreeInfo } from './TreeInfo';
import { formDecorator } from "./storyUtils";

export default {
  title: 'AddTree/TreeInfo',
  component: TreeInfo,
};

const Template = (args) => <TreeInfo {...args} />;

export const Default = Template.bind({});
Default.decorators = [formDecorator];
