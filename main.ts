import { App, Plugin, Notice, MarkdownView, WorkspaceLeaf, ItemView } from 'obsidian';
const syllable = require('syllable').default || require('syllable').syllable || require('syllable');

// Custom view for the sidebar panel
const VIEW_TYPE_SYLLABLE_COUNT = "syllable-count-view";

class SyllableCountView extends ItemView {
    private contentEl: HTMLElement;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        // Get the main content container
        this.contentEl = this.containerEl.children[1];
    }

    // Return the unique view type for this view
    getViewType() {
        return VIEW_TYPE_SYLLABLE_COUNT;
    }

    // Return the display text for the view's tab
    getDisplayText() {
        return "Syllable Count";
    }

    // Return the icon to use for this view's tab
    getIcon(): string {
        return "music-2"; // Uses the built-in "music-2" icon
    }

    // Called when the view is opened
    async onOpen() {
        this.updateSyllableCounts();
    }

    // Update the syllable counts based on the current active note
    async updateSyllableCounts() {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeView) {
            // If there's no active Markdown file, display a message
            this.contentEl.empty();
            this.contentEl.createEl("p", { text: "No active markdown file." });
            return;
        }

        const editor = activeView.editor;
        const lines = editor.getValue().split("\n"); // Split the note into lines
        this.contentEl.empty(); // Clear existing content

        let inFrontmatter = false; // Track whether we're inside frontmatter
        let itemCount = 0;         // Count of valid lines
        let lastItemIndex = -1;    // Index of the last valid line

        // First, count the valid items to determine the last item index
        lines.forEach((line) => {
            const trimmedLine = line.trim();

            // Toggle frontmatter tracking on/off when encountering "---"
            if (trimmedLine === "---") {
                inFrontmatter = !inFrontmatter;
                return;
            }

            // Skip lines that are inside frontmatter, empty, or special Markdown syntax
            if (
                inFrontmatter ||
                trimmedLine === "" ||
                trimmedLine.startsWith("#") ||
                trimmedLine.startsWith("```") ||
                trimmedLine.startsWith(">")
            ) {
                return;
            }

            // Increment itemCount for valid lines
            itemCount++;
            lastItemIndex++;
        });

        // Reset frontmatter tracking for the second pass
        inFrontmatter = false;
        let currentItemIndex = 0; // Index to keep track of valid items

        // Now, generate the syllable count items
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            // Toggle frontmatter tracking on/off when encountering "---"
            if (trimmedLine === "---") {
                inFrontmatter = !inFrontmatter;
                return;
            }

            // Skip lines that are inside frontmatter, empty, or special Markdown syntax
            if (
                inFrontmatter ||
                trimmedLine === "" ||
                trimmedLine.startsWith("#") ||
                trimmedLine.startsWith("```") ||
                trimmedLine.startsWith(">")
            ) {
                return;
            }

            const count = syllable(line); // Get the syllable count for the line
            const lineText = trimmedLine === "" ? "(empty line)" : line;

            // Create a styled container for each line's syllable count
            const lineItem = this.contentEl.createEl("div", { cls: "syllable-count-item" });
            lineItem.createEl("span", { cls: "syllable-line-number", text: `Line ${index + 1}: ` });
            lineItem.createEl("span", { cls: "syllable-line-text", text: lineText });
            lineItem.createEl("span", { cls: "syllable-count-value", text: `(${count} syllables)` });

            // Add "last-item" class to the last valid line item
            if (currentItemIndex === lastItemIndex) {
                lineItem.addClass("last-item");
            }
            currentItemIndex++;
        });
    }
}

export default class LyricistHelperPlugin extends Plugin {
    async onload() {
        console.log('Loading Lyricist Helper plugin...');

        // Register the custom view type with Obsidian
        this.registerView(
            VIEW_TYPE_SYLLABLE_COUNT,
            (leaf) => new SyllableCountView(leaf)
        );

        // Add a command to show the syllable count view
        this.addCommand({
            id: 'show-syllable-count-view',
            name: 'Show Syllable Count view',
            callback: () => this.activateView()
        });

        // Update syllable counts whenever the active leaf or content changes
        this.registerEvent(
            this.app.workspace.on('active-leaf-change', () => this.updateView())
        );

        this.registerEvent(
            this.app.workspace.on('editor-change', () => this.updateView())
        );

        // Automatically activate the view on plugin load
        this.activateView();

        // Load external styles
        this.loadStyles();
    }

    onunload() {
        console.log('Unloading Lyricist Helper plugin...');
        // Detach the syllable count view when the plugin is unloaded
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_SYLLABLE_COUNT);
    }

    // Activate the syllable count view if it's not already active
    async activateView() {
        const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SYLLABLE_COUNT);
        if (leaves.length === 0) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE_SYLLABLE_COUNT,
            });
        }
        this.updateView();
    }

    // Update the syllable count view
    async updateView() {
        const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SYLLABLE_COUNT);
        if (leaves.length > 0) {
            const view = leaves[0].view as SyllableCountView;
            view.updateSyllableCounts();
        }
    }

    // Load styles from an external file
    loadStyles() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = this.getAssetPath("styles.css");
        document.head.appendChild(link);
    }
}
