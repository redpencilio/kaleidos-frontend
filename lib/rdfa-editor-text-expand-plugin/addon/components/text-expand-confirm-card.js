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
        let text = info.text;
        let cursorPos = text.length;
        const idx = text.indexOf("%cursor%")
        if(idx !== -1){
            cursorPos = idx;
            text = text.replace('%cursor%', '');
        }
        info.editor.update(selection, {
            set: { innerHTML: text }
        });
        info.editor.setCurrentPosition(mappedLocation[0] + cursorPos);
    }
}