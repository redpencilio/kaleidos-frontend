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
        const keyword = "hello";
        for (const rdfaBlock of rdfaBlocks) {
            let idx = rdfaBlock.text.indexOf(keyword);
            if (idx !== -1) {
                const absoluteLocation = normalizeLocation([idx, idx + keyword.length], rdfaBlock.region);
                hintsRegistry.addHint(hrId, this.scope, {
                    location: absoluteLocation,
                    card: this.cardComponentId,
                    info: {
                        hrId, hintsRegistry, editor,
                        location: absoluteLocation,
                        scope: this.scope
                    }
                });

            }
        }
    }
}