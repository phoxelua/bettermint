declare module 'react-async-script-loader' {
  import { Component } from 'react';

  class ElementClass extends Component<any, any> {}

  interface ClassDecorator {
    <T extends (typeof ElementClass)>(component: T): T;
  }

  function scriptLoader(url: string): ClassDecorator;

  export default scriptLoader;
}
