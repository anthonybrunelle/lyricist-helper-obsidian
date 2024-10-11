# Lyricist Helper

Lyricist Helper is an Obsidian plugin designed to assist songwriters and lyricists by displaying syllable counts for each line in their notes. It provides a custom sidebar panel that shows the syllable counts for plain text lines, excluding non-lyric elements like frontmatter, headings, and code blocks.

## Features

- Displays syllable counts for each line in the active note.
- Filters out non-plain-text lines such as frontmatter, headings, blockquotes, and code blocks.
- Automatically updates the syllable count view when the note content changes.
- Supports custom styling for a clean and readable display.

## Manual Installation

1. **Download the plugin**:
   - Clone the repository or download the ZIP file and extract it.

2. **Build the plugin**:
   - Make sure you have [Node.js](https://nodejs.org/) installed.
   - In the plugin directory, run the following commands:
     ```bash
     yarn install
     yarn dev
     ```

3. **Install the plugin in Obsidian**:
   - Move the generated plugin folder to your Obsidian vault's `.obsidian/plugins/` directory.
   - In Obsidian, go to `Settings` > `Community plugins`, disable Safe mode, and enable the Lyricist Helper plugin.

## Usage

1. **Enable the Syllable Count View**:
   - Open the command palette (Ctrl+P or Cmd+P) and run the command `Show Syllable Count View`.
   - The "Syllable Count" panel will appear in the right sidebar.

2. **View Syllable Counts**:
   - The sidebar panel displays syllable counts for each line in the active note, updating automatically when changes are made.

3. **Customizing the Display**:
   - The plugin filters out lines such as frontmatter, headings, blockquotes, and code blocks, focusing on plain text lyrics.

## Development

If you want to contribute or make changes to the plugin:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/lyricist-helper.git
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development build**:
   ```bash
   yarn dev
   ```

The plugin will be rebuilt automatically when you make changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Syllable](https://www.npmjs.com/package/syllable): The library used to count syllables.
- [Obsidian](https://obsidian.md/): A powerful knowledge base that works on top of a local folder of plain text Markdown files.

## Issues and Feedback

If you encounter any issues or have feedback, feel free to open an issue on the [GitHub repository](https://github.com/anthonybrunelle/lyricist-helper-obsidian).

