/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface NkSideDrawer {
    'title': string;
  }
  interface NkSideDrawerAttributes extends StencilHTMLAttributes {
    'title'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyComponent': Components.MyComponent;
    'NkSideDrawer': Components.NkSideDrawer;
  }

  interface StencilIntrinsicElements {
    'my-component': Components.MyComponentAttributes;
    'nk-side-drawer': Components.NkSideDrawerAttributes;
  }


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLNkSideDrawerElement extends Components.NkSideDrawer, HTMLStencilElement {}
  var HTMLNkSideDrawerElement: {
    prototype: HTMLNkSideDrawerElement;
    new (): HTMLNkSideDrawerElement;
  };

  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement
    'nk-side-drawer': HTMLNkSideDrawerElement
  }

  interface ElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'nk-side-drawer': HTMLNkSideDrawerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
