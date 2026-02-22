<template>
  <div>
    <h1>Frontend Coding Challenge</h1>

    <p>
      This project is a basic
      <a
        href="https://nuxt.com/docs/getting-started/introduction"
        target="_blank"
        >Nuxt 3</a
      >
      app which uses some free API data to fetch a list of users and display
      their information in a list.
    </p>

    <p>
      By clicking on one of the elements in the list, you are redirected to the
      user's profile, which currently misses the call to get the user
      information.
    </p>

    <p>
      The website is not well-designed on purpose, but you don't have to work on
      this part.
    </p>

    <h2>Tasks</h2>

    <ol class="challenge-tasks">
      <li>
        <h3>Responsiveness</h3>
        Change the current layout to bring some responsive behaviour. Only
        implement a single solution, but try to think of different solutions
        that could be used to achieve responsiveness.
      </li>

      <li>
        <h3>SSR vs SPA</h3>
        Implement the call to get the user information when navigating to their
        profile using a
        <a
          href="https://nuxt.com/docs/4.x/getting-started/data-fetching"
          target="_blank"
          >Nuxt built-in hook</a
        >. Use the following endpoint:
        <code>https://jsonplaceholder.typicode.com/users/{id}</code><br />
        Display some information, but do not add too much styling.
        <ul>
          <li>
            Change the Nuxt configuration to behave in SPA
            (single-page-application) mode, and compare the behavior when
            previously using the SSR (server-side-rendering) mode.
          </li>
        </ul>
      </li>
      <li>
        <h3>Page loading performance</h3>
        <p>
          Navigate to the <code>/gallery</code> page which contains a list of
          photos. This page is meant to be publicly accessible.
        </p>
        <ul>
          <li>
            What would be your 2-3 recommendations or approaches to guide a
            small team of developers to improve the loading performance of the
            Gallery page?<br />
            Try to suggest something that the team can easily align on and let
            them find their own solutions to implement it.<br />
            Optionally, include a brief code draft or example to illustrate how
            to begin applying your recommendation.
          </li>
          <li>
            What would be your own top recommendations (max. 3) if you were
            responsible for optimizing the page?<br />
            Implement a few of these recommendations directly in code, focusing
            on those you consider most impactful.
          </li>
        </ul>
      </li>
      <li>
        <h3>Architecture</h3>
        <p>
          The Gallery currently fetches its data from <code>/api/gallery</code>,
          using a
          <a
            href="https://nuxt.com/docs/guide/directory-structure/server#api-routes"
            target="_blank"
            >Nuxt server route</a
          >
          which acts as a minimal Backend-for-Frontend (BFF).
        </p>
        <ul>
          <li>
            Improve the current implementation - but focus on making a decision
            for a quick first iteration.<br />
            You can choose one of the following approach as example:
            <ol>
              <li>Continue with the current setup (BFF)</li>
              <li>Move the all logic into the client-side</li>
              <li>Use a static site generation (SSG) approach</li>
              <li>
                Any other approach that can simplify or quickly optimize the
                current implementation
              </li>
            </ol>
          </li>
          <li>
            <strong>(Bonus)</strong> Could Nuxt be used as a full backend?
            <br />
            In what scenarios would that make sense, and what might be the
            limitations?
          </li>
        </ul>
      </li>
      <li data>
        <h3>(Bonus) Accessibility</h3>
        <p>
          What can you say regarding the actual accessibility of the website?<br />
          Where would you start if you were to improve it? You can present a
          rough plan of action or a few code examples.
        </p>
      </li>
    </ol>

    <h2>Goal</h2>
    <p>
      Please take no more than 1-2 hours for this task. We are aware of
      everyone's time limitations and appreciate you taking time to complete
      this challenge. The goal of the exercise is not to invest too much time to
      search or implement the perfect solution but rather to discuss the pros
      and cons of the different approaches on the different tasks. Let us know
      if you have any questions. We'd prefer to talk about a problem first
      before investing too much time into the wrong solution. We are happy to
      help!
    </p>

    <p>There are no right or wrong answers.</p>

    <p>Therefore, please try to not:</p>
    <ul>
      <li>Add too many extra elements</li>
      <li>Add too much extra styling</li>
    </ul>

    <p>Feel free to ask any questions if anything is not clear!</p>
  </div>
</template>
