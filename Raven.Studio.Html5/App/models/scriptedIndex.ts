import document = require("models/document");
import documentMetadata = require("models/documentMetadata");

class scriptedIndex extends document {

    deleteLater = ko.observable<boolean>();

    indexScript = ko.observable<string>();
    deleteScript = ko.observable<string>();

    constructor(dto: scriptedIndexDto) {

        super(dto);

        this.indexScript(dto.IndexScript);
        this.deleteScript(dto.DeleteScript);
    }

    static emptyForIndex(indexName: string): scriptedIndex {
        var meta = [];
        meta['@id'] = "Raven/ScriptedIndexResults/" + indexName;
        meta['Raven-Entity-Name'] = 'ScriptedIndexResults';
        return new scriptedIndex({
            '@metadata': meta,
            IndexScript: "",
            DeleteScript: ""
        });
    }

    toDto(): scriptedIndexDto {
        var meta = this.__metadata.toDto();
        return {
            '@metadata': meta,
            IndexScript: this.indexScript(),
            DeleteScript: this.deleteScript()
        };
    }

    markToDelete() {
        this.indexScript("");
        this.deleteScript("");
        this.deleteLater(true);
    }

    cancelDeletion() {
        this.deleteLater(false);
    }

    isMarkedToDelete(): boolean {
        return this.deleteLater();
    }
}

export = scriptedIndex;