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


          <h4>Configuring GitHub</h4>
          We need to confiure both username and password as next step after installation
          <code>
            <br />git config --global user.name "user_name"
            <br />git config --global user.email "email_id"<br />
          </code>
          <h4>Creating a local repository</h4>{" "}
          <code>git init myCodeFolder</code>
          <h4>
            Adds the files in the local repository and stages them for commit
          </h4>
          <code>git add .</code>
          <h4>Committing changes made to the index</h4>
          <code>git commit -m "some_message"</code>
          <h4>
            Connect the remote repository to the local repository. First the
            remote repository should be created with the same name of the local
            repository{" "}
          </h4>
          <code>
            git remote add origin https://github.com/user_name/myCodeFolder.git
          </code>
          <h4>Pushing files in local repository to GitHub repository</h4>
          <code>git push origin master</code>
          <h4>To unstage a file</h4>
          <code>git reset HEAD FILE_NAME</code>
          <h4>Merge development branch with master</h4>
          These are first work with branch and after finish merge to master
          <code>
            <br />git branch development
            <br />git add *
            <br />git commit -m "My commit message"
            <br />git push -u origin development <br />
          </code>

            Now I will merge all the changes on the development branch into the
            master
            <code>
              <br /> git checkout master
              <br />git merge development
              <br />git push -u origin master<br />
            </code>

          <h4>To remove the commit(before push) and to modify the file </h4>
          <code>git reset --soft HEAD~1</code>
          <h4>
            Setting your branch to exactly match the remote branch can be done
            in two steps
          </h4>
          <code>
            git fetch origin
            <br />git reset --hard origin/master<br />
          </code>
          <h4>
            I you want to save my current branch's state other than master
          </h4>
          <code>
            git commit -a -m "Saving my work, just in case"
            <br />git branch my-saved-work<br />
          </code>
          <h4>When to use git stash</h4>

            When I have changes on the working copy, git pull will not work.
            This is mainly to stash the changes in a dirty working directory
            away. In other words, when I want to record the current state of the
            working directory and the index, but want to go back to a clean
            working directory.

          <code>git stash</code>
          <h4>
            When I want to pull the new changes to my local from the remote.{" "}
          </h4>

            This command incorporates changes from a remote repository into the
            current branch. It will pull changes from upstream branch. In its
            default mode, git pull is shorthand for
            <code>git fetch</code> followed by
            <code>git merge FETCH_HEAD.</code>{" "}

          <code>git pull //this will from the master </code>

            Pull before before making change in the local. Do not pull after
            making change, otherwise I will have conflicts

          <h4>If I want to back to working copy from sstashed copy</h4>.
          <code>git stash pop</code>

            This will apply stashed changes back to working copy unless there is
            conflicts. In the case of conflict, they will stay in stash.

          <h4>To resolve conflict</h4>

            <code>git staus</code> to show where is the conflicts. Resolve and
            commit.

          <h4>There is another better way to merge development</h4>


            merge master into the development first so that if there are any
            conflicts, it can be resolved in the development branch itself and
            master remains clean.
            <code>

              <br />git branch development
              <br />git merge master (resolve any merge
              <br />conflicts if there are any)
              <br />git add *
              <br />git commit -m "My commit message"
              <br />git push -u origin development
              <br />git checkout master
              <br />git merge --no-ff development (there won't be any conflicts now)
              <br />git push -u origin master<br />
            </code>
            <br />
            These steps are sometimes to leave master untouched until final
            stuff.
            <code> --no-ff development </code> to keep track of who did the
            merge and when. This is generally useful only when merging
            development into the master (last step), because I might need to
            merge master into development (first step) multiple times in my
            workflow, and creating a commit node for these might not be very
            useful.


      </div>
    );
  }
}

export default Gitcheat;
