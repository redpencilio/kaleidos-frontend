import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * Card that prompts the user to confirm text insert
 *
 * @class TextExpandConfirmCard
 * @extends Glimmer.Component
 */

export default class DocumentSelectCard extends Component {
    @service router;
    @service store;

    @tracked agendaitem;

    constructor(){
        super(...arguments);
        this.info = this.args.info;
        this.scope = this.info.scope;
        this.editor = this.info.editor;
        this.isNewList = this.info.isNewList;
        // this.selectedDocuments = this.info.documents
        this.getRecords();
    }

    insertDocumentsHeader(){
        const info = this.info;
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        let selection = info.editor.selectHighlight(mappedLocation);
        const html = '<div property="document-list"></div>';
        info.editor.update(selection, {
            set: { innerHTML: html }
        });
    }

    async temporarysolution(item){
        const info = this.info;
        const lastVersionDocument = await item.lastDocument;
        info.hintsRegistry.removeHintsAtLocation(info.location, info.hrId, this.scope);
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        let selection = info.editor.selectHighlight(mappedLocation);
        const html = `<a href="${item.uri}" property="rdf:seeAlso">${lastVersionDocument.name}</div>`;
        info.editor.update(selection, {
            set: { innerHTML: html }
        });
    }

    @action
    itemClicked(item){
        if (!item.isSelected){
            // add file to files
            if (this.isNewList) {
                this.temporarysolution(item);
                this.isNewList = false;
            }
            // let selection = this.info.editor.selectContext(this.info.editor.richNode.region, {
            //     property: 'document-list'
            // });
            // console.log(selection);
            // this.info.editor.update(selection, {
            //     add: { innerHTML: ''}
            // });
            item.isSelected = false;
        } else {
            // remove file from files
            item.isSelected = true;
        }


    }

    async getRecords(){
        const agendaItemId = this.router.currentRoute.parent.params.agendaitem_id;
        console.log(agendaItemId);
        this.isLoading = true;
        this.agendaitem = await this.store.findRecord('agendaitem', agendaItemId);
        this.isLoading = false;
    }
}