import Component from '@glimmer/component';
import CONFIG from 'fe-redpencil/utils/config';

export default class FormalStatusSelector extends Component {
  options = CONFIG.formallyOkOptions;

  optionByUri(uri) {
    return this.options.find( (option) => option.uri === uri );
  }

  get selectedFormalStatus() {
    const received = this.args.formalStatus;
    if( received )
      return this.optionByUri( received );
    else
      return this.optionByUri( CONFIG.notYetFormallyOk );
  }
}
