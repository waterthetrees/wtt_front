import { default as TreeLayerLegend } from './TreeLayerLegend';
import { treeHealth } from '../../util/treeHealth';

export default {
  title: 'Map/TreeLayerLegend',
  component: TreeLayerLegend,
};

// mocked Map class, an instance of which is expected by the TreeLayerLegend
class Map {
  on() { }

  loaded() {
    return true;
  }

  getLayer() {
    return null;
  }

  getLayoutProperty() {
    return true;
  }

  setLayoutProperty() {
  }
}

// supply a Map instance to the TreeLayerLegend in each story
const Template = (args) => <TreeLayerLegend map={new Map()} {...args} />;

export const Default = Template.bind({});

export const RGB = Template.bind({});
RGB.args = {
  targets: [
    {
      layer: 'good',
      label: 'Good',
      color: 'red'
    },
    {
      layer: 'soso',
      label: 'So-so',
      color: 'green'
    },
    {
      layer: 'meh',
      label: 'Meh',
      color: 'blue'
    },
  ],
  title: 'Layers',
  defaultExpanded: true
};

export const TreeHealth = Template.bind({});
TreeHealth.args = {
  targets: [
    ...treeHealth.getNameValuePairs().reverse(),
    ['noData', 'No Data'],
  ]
    .map(([name, label]) => ({
      layer: name,
      label: typeof label === 'string'
        ? label
        : name.replace(/(^\w)/g, (m) => m.toUpperCase()),
      color: treeHealth.getColorByName(name, 'fill'),
    })),
  title: 'Tree Layers',
  defaultExpanded: true
};
