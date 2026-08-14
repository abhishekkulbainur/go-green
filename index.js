import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 51);
    const y = random.int(0, 6);
    const date = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = {
      date: date,
    };

    console.log(`Committing (${i + 1}/${n}): ${date}`);
    jsonfile.writeFileSync(path, data);

    await git.add([path]);
    await git.commit(date, { "--date": date });
  }

  console.log("Pushing all commits to GitHub...");
  await git.push(["--force"]);
  console.log("Done! All commits have been pushed successfully.");
};

makeCommits(100).catch((err) => {
  console.error("Error making commits:", err);
});
