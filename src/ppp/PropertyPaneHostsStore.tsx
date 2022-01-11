interface IPropertyPaneHostsStoreProps {
  hosts: Record<string, HTMLElement>;
  updateHost: Function;
  forcePropertyPanePortalUpdate: Record<string, Function>;
}

function PropertyPaneHostsStoreFactory() {
  const hosts: Record<string, HTMLElement> = {};

  // Placeholder for Property Pane force update hook
  const forcePropertyPanePortalUpdate: Record<string, Function> = {};

  const updateHost = (instanceId: string, targetProperty: string, hostElement: HTMLElement) => {
    hosts[`${instanceId}-${targetProperty}`] = hostElement;
    // Trigger PropertyPanePortal component refresh
    if (forcePropertyPanePortalUpdate[instanceId]) forcePropertyPanePortalUpdate[instanceId](new Date().toISOString());
  };

  return { hosts, updateHost, forcePropertyPanePortalUpdate };
}

// Store for managing the Property Pane hosts
export const propertyPaneHostsStore: IPropertyPaneHostsStoreProps = PropertyPaneHostsStoreFactory();