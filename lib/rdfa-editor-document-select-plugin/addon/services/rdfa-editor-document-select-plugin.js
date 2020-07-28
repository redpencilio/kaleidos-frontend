import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

const CARD_COMPONENT_ID = 'document-select-card';

/**
 * Service responsible for detecting and expanding predefined keywords
 *
 * @class RdfaEditorTextExpandPlugin
 * @extends EmberService
 */

export default class RdfaEditorDocumentSelectPlugin extends Service {
    constructor() {
        super(...arguments);
        this.scope = 'DOCUMENT_SELECT_PLUGIN';
        this.cardComponentId = 'document-select-card';
    }

    execute(hrId, rdfaBlocks, hintsRegistry, editor) {
        hintsRegistry.removeHintsInRdfaBlocks(rdfaBlocks, hrId, this.scope);
        const keyword = /:docu/;
        for (const rdfaBlock of rdfaBlocks) {
            if (!rdfaBlock.text) return;
            let match = rdfaBlock.text.match(keyword);

            if (match) {
                const { 0: fullMatch, 1: term, index: start } = match;

                const absoluteLocation = normalizeLocation([start, start + fullMatch.length], rdfaBlock.region);

                hintsRegistry.addHint(hrId, this.scope, {
                    location: absoluteLocation,
                    card: this.cardComponentId,
                    info: {
                        hrId, hintsRegistry, editor,
                        location: absoluteLocation,
                        scope: this.scope,
                        isNewList: true
                    }
                });
            }
        }
    }
}