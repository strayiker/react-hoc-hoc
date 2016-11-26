/**
 * Created by Kir on 26.11.2016.
 */

import React, { Component } from 'react';
import invariant from 'invariant';


export default (Hoc) => {
  const hocDisplayName = Hoc.displayName || Hoc.name;

  return (...args) => (Composed) =>
    class extends Component {
      static displayName = `Hoc(${hocDisplayName})`;

      /**
       * Access the wrapped Component's instance.
       */
      getRefInstance() {
        invariant(typeof this.hoc.getRefInstance === 'function',
          `'${hocDisplayName}' should implement 'getRefInstance' method that returns instance of composed component.`);

        return this.hoc.getRefInstance();
      }

      render() {
        return (
          <Hoc
            ref={(c) => { this.hoc = c; }}
            hocProps={{ component: Composed, args }}
            {...this.props}
          />
        );
      }
    };
};
