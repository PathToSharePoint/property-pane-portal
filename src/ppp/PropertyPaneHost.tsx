// Author : Christophe Humbert
// Github : @PathToSharePoint
// Twitter: @Path2SharePoint

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { propertyPaneHostsStore } from './PropertyPaneHostsStore';

export interface IPropertyPaneHostBuilderProps {
  context?: any;
}

export interface IPropertyPaneHostBuilderInternalProps extends IPropertyPaneHostBuilderProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneHostBuilder implements IPropertyPaneField<IPropertyPaneHostBuilderInternalProps> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneHostBuilderInternalProps;

  private elem!: HTMLElement;

  constructor(targetProperty: string, hostProperties: IPropertyPaneHostBuilderProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      context: hostProperties.context,
      key: targetProperty,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
    // Update hosts store
    propertyPaneHostsStore.updateHost(this.properties.context.instanceId, this.targetProperty, null);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    // Update hosts store
    propertyPaneHostsStore.updateHost(this.properties.context.instanceId, this.targetProperty, elem);
  }
}

export function PropertyPaneHost(targetProperty: string, hostProperties: IPropertyPaneHostBuilderProps): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return new PropertyPaneHostBuilder(targetProperty, hostProperties);
}