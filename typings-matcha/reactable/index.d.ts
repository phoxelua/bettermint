declare module "reactable" {
  import { Component } from 'react';

  export class Table extends Component<any, any> {}

  export class Tr extends Component<any, any> {}

  export class Td extends Component<any, any> {}

  export class Th extends Component<any, any> {}

  export namespace Sort {
    function Numeric(a, b): number;
  }
}
