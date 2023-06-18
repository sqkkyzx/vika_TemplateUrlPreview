import React from 'react';
import { initializeWidget } from '@apitable/widget-sdk';
import { Information } from './information';
import { Setting } from './setting';

const WidgetDeveloperTemplate: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100%', borderTop: "1px solid #f2f2f2"}}>
      <div style={{ flexGrow: 1, overflow: 'auto', height: '100%', overflowX: 'hidden', overflowY: 'hidden'}}>
        <Information />
    </div><Setting /></div>
  );
};

initializeWidget(WidgetDeveloperTemplate, process.env.WIDGET_PACKAGE_ID!);
