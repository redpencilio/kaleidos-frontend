import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

const CARD_COMPONENT_ID = 'text-expand-confirm-card';

/**
 * Service responsible for detecting and expanding predefined keywords
 *
 * @class RdfaEditorTextExpandPlugin
 * @extends EmberService
 */

const keywordDict = {
    'white': 'black',
    'loud': 'quiet',
    'textwithnospaces': 'Text with a lot of spaces'
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

export default class RdfaEditorTextExpandPlugin extends Service {
    constructor(){
        super(...arguments);
        this.scope = 'TEXT_EXPAND_PLUGIN';
        this.cardComponentId = 'text-expand-confirm-card';
    }

    execute(hrId, rdfaBlocks, hintsRegistry, editor){
        hintsRegistry.removeHintsInRdfaBlocks(rdfaBlocks, hrId, this.scope);
        for (const rdfaBlock of rdfaBlocks){
            for (const keyword in keywordDict){
                const idx = rdfaBlock.text.indexOf(keyword);
                if (idx !== -1){
                    const absoluteLocation = normalizeLocation([idx, idx + keyword.length], rdfaBlock.region);
                    hintsRegistry.addHint(hrId, this.scope, {
                        location: absoluteLocation,
                        card: this.cardComponentId,
                        info: {
                            hrId, hintsRegistry, editor,
                            location: absoluteLocation,
                            text: keywordDict[keyword],
                            scope: this.scope
                        }
                    });

                }
            }
        }
    }
}