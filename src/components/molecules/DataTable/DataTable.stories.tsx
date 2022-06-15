import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DataTable from './DataTable';
import { zipTransmission } from './data';

export default {
  title: 'Components/DataTable',
  argTypes: {
    columns: {},
  },
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />;

export const Primary = Template.bind({
  columns: [
    {
      name: 'Job Id',
      sortable: true,
      type: 'string',
    },
    {
      name: 'Size',
      sortable: true,
      type: 'number',
    },
    {
      name: 'Type',
      sortable: true,
      type: 'string',
    },
    {
      name: 'Active',
      sortable: true,
      type: 'boolean',
    },
  ],
  striped: true,
});
Primary.args = {
  columns: [
    {
      disablePadding: false,
      id: 'id',
      label: 'ID',
    },
    {
      disablePadding: true,
      id: 'customerId',
      label: 'Customer ID',
    },
    {
      disablePadding: true,
      id: 'projectId',
      label: 'Project ID',
    },
    {
      disablePadding: true,
      id: 'timeStamp',
      label: 'Timestamp',
    },
    {
      disablePadding: true,
      id: 'fileExtension',
      label: 'File Extension',
    },
    {
      disablePadding: true,
      id: 'fileSize',
      label: 'File Size',
    },
  ],
  striped: true,
  showSelection: true,
  showCollapse: true,
  data: zipTransmission,
};