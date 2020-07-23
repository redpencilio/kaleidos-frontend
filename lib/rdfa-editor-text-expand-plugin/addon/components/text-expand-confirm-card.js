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
        this.insertkeyEventListener = this.insertkeyEventListener.bind(this);
    }

    @action
    onRender(){
        document.addEventListener('keyup', this.insertkeyEventListener)
    }

    @action
    onWillDestroy(){
        document.removeEventListener('keyup', this.insertkeyEventListener);
    }

    insertkeyEventListener(event){
        console.log(event);
        if(event.keyCode === 9){
            this.insert();
        }
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