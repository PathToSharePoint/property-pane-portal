// Author : Christophe Humbert
// Github : @PathToSharePoint 
// Twitter: @Path2SharePoint

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IPropertyPanePortalProps } from './IPropertyPanePortalProps';

import { propertyPaneHostsStore } from './PropertyPaneHostsStore';

export const PropertyPanePortal: React.FunctionComponent<IPropertyPanePortalProps> = (props) => {

    // We'll force a re-render if needed when the hosts are in place
    const [, setPropertyPanePortalRefresh] = React.useState(new Date().toISOString());

    propertyPaneHostsStore.forcePropertyPanePortalUpdate[props.context.instanceId] = setPropertyPanePortalRefresh;

    const portals = [];

    React.Children.forEach<React.ReactNode>(props.children, (child: React.ReactElement) => {
        if ((child)
            && (child.props["data-property"])
            && (propertyPaneHostsStore.hosts[`${props.context.instanceId}-${child.props["data-property"]}`])
            && (propertyPaneHostsStore.hosts[`${props.context.instanceId}-${child.props["data-property"]}`] instanceof HTMLElement)) {
            portals.push(ReactDOM.createPortal(child, propertyPaneHostsStore.hosts[`${props.context.instanceId}-${child.props["data-property"]}`]));
        }
    });

    return (<>{portals}</>);
};