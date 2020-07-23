import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Card that prompts the user to confirm text insert
 *
 * @class TextExpandConfirmCard
 * @extends Glimmer.Component
 */

export default class TextExpandConfirmCard extends Component {
    constructor(){
        super(...arguments);
    }

    @action
    insert(){
        const info = this.args.info;
        info.hintsRegistry.removeHintsAtLocation(info.location, info.hrId, info.scope);
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        let selection = info.editor.selectHighlight(mappedLocation);
        info.editor.update(selection, {
            set: { innerHTML: info.text }
        });
    }
}