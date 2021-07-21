#!/usr/bin/env node

require("dotenv").config();

const commander = require("commander");
const program = new commander.Command();

const listCommand = program.command("list");

listCommand
  .command("tags")
  .description("list all tags")
  .action(require("./list").listTags);

listCommand
  .command("meta")
  .description("list all meta files")
  .action(require("./list").listMetaFiles);

program
  .command("delete")
  .command("tag <tag>")
  .description("delete tag")
  .action(require("./delete").deleteTag);

program
  .command("merge")
  .command("tag <toTag> <fromTag>")
  .description("merges <fromTag> into <toTag>")
  .action(require("./merge").mergeTag);

program.parse(process.argv);
