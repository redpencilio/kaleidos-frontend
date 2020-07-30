import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

const CARD_COMPONENT_ID = 'document-select-card';

/**
 * Service responsible for detecting and expanding predefined keywords
 *
 * @class RdfaEditorTextExpandPlugin
 * @extends EmberService
 */

function zip(){
    return arguments[0].map((_, index) => [...([...arguments].map((x) => x[index]))]);
}

export default class RdfaEditorDecisionLayoutManager extends Service {
    constructor() {
        super(...arguments);
        this.scope = 'DECISION_LAYOUT_MANAGER';
        this.cardComponentId = 'hello-card';
    }

    /**
     * <div property="rdf:title">
     * <h1>The title must be inserted here</h1>
     * </div>
     *
     * <div property="decision-content">
     *  ...some content...
     * </div>
     *
     * <ul property="ext:documentList">
     * ... some list items
     * </ul>
     */

    checkDocumentSections(editor){
        const sectionNames = ['document-title', 'ext:documentList'];
        const sectionPositions = sectionNames.map((sectionName) => {
            let selection = editor.selectContext(editor.richNode.region, {
                property: sectionName
            });
            if(!selection || selection.selections.length === 0) {
                console.log(`section "${sectionName}" is missing!`)
                return -1;
            }

            return selection;
        });

        return [sectionNames, sectionPositions];
    }

    execute(hrId, rdfaBlocks, hintsRegistry, editor) {
        // const [sectionNames, sectionPositions] = this.checkDocumentSections(editor);
        if (!rdfaBlocks.text) return;
    }
}