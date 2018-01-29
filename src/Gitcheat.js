import React, { Component } from "react";

class Gitcheat extends Component {
  render() {
    return (
      <div>
        <h1>GIT Cheatsheet</h1>

        <p>
          I must use Git for code push, pull and commit. So I decided to make a
          cheatsheet on Docker.
        </p>

        <p>
          <h3>Configuring GitHub</h3>
          <code>
            git config --global user.name "user_name"<br />
            git config --global user.email "email_id"
          </code>
          <h3>Creating a local repository</h3>{" "}
          <code>git init myCodeFolder</code>
          <h3>
            Adds the files in the local repository and stages them for commit
          </h3>
          <code>git add .</code>
          <h3>Committing changes made to the index</h3>
          <code>git commit -m "some_message"</code>
          <h3>
            Connect the remote repository to the local repository. First the
            remote repository should be created with the same of the local
            repository{" "}
          </h3>
          <code>
            git remote add origin https://github.com/user_name/myCodeFolder.git
          </code>
          <h3>Pushing files in local repository to GitHub repository</h3>
          <code>git push origin master</code>
          <h3>To unstage a file</h3>
          <code>git reset HEAD FILE_NAME</code>
          <h3>Merge development branch with master</h3>
          <code>
            git branch development <br />
            git add * <br />
            git commit -m "My commit message" <br />
            git push -u origin development <br />{" "}
          </code>
          <p>
            Now I will merge all the changes on the development branch into the
            master
            <code>
              <br /> git checkout master <br />
              git merge development <br />
              git push -u origin master
            </code>
          </p>
          <h3>To remove the commit(before push) and to modify the file </h3>
          <code>git reset --soft HEAD~1</code>
          <h3>
            Setting your branch to exactly match the remote branch can be done
            in two steps
          </h3>
          <code>
            git fetch origin <br />
            git reset --hard origin/master
          </code>
          <h3>
            I you want to save your current branch's state other than master
          </h3>
          <code>
            git commit -a -m "Saving my work, just in case" <br />
            git branch my-saved-work
          </code>
          <h3>When to use git stash</h3>
          <p>
            When I have changes on the working copy, git pull will not work.
            This is mainly to stash the changes in a dirty working directory
            away. In other words, when I want to record the current state of the
            working directory and the index, but want to go back to a clean
            working directory.
          </p>
          <code>git stash</code>
          <h3>
            When I want to pull the new changes to my local from the remote.{" "}
          </h3>
          <p>
            This command incorporates changes from a remote repository into the
            current branch. It will pull changes from upstream branch. In its
            default mode, git pull is shorthand for
            <code>git fetch</code> followed by{" "}
            <code>git merge FETCH_HEAD.</code>{" "}
          </p>
          <code>git pull //this will from the master </code>
          <p>
            Pull before before making change in the local. Do not pull after
            making change, otherwise I will have conflicts
          </p>
          <h3>If I want to back to working copy from sstashed copy</h3>.
          <code>git stash pop</code>
          <p>
            This will apply stashed changes back to working copy unless there is
            conflicts. In the case of conflict, they will stay in stash.
          </p>
          <h3>To resolve conflict</h3>
          <p>
            <code>git staus</code> to show where is the conflicts. Resolve and
            commit.{" "}
          </p>
          <h3>There is another better way to merge development</h3>
          <p>
            {" "}
            merge master into the development first so that if there are any
            conflicts, it can be resolved in the development branch itself and
            master remains clean.
            <code>
              {" "}
              git branch development <br /> git merge master (resolve any merge
              conflicts if there are any)<br />
              git add * <br />
              git commit -m "My commit message" <br />
              git push -u origin development <br />
              git checkout master <br />
              git merge --no-ff development (there won't be any conflicts now){" "}
              <br />
              git push -u origin master
            </code>{" "}
            <br />
            These steps are sometimes to leave master untouched until final
            stuff.
            <code> --no-ff development </code> to keep track of who did the
            merge and when. This is generally useful only when merging
            development into the master (last step), because I might need to
            merge master into development (first step) multiple times in my
            workflow, and creating a commit node for these might not be very
            useful.
          </p>
        </p>
      </div>
    );
  }
}

export default Gitcheat;
