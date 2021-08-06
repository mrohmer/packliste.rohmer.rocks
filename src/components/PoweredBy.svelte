<style lang="scss">
  @use "src/styles/variables" as var;
    .powered-by {
      font-size: 12px;
      text-align: center;
      padding: 10px;

      &_heart {
        color: red;
      }
      a {
        color: var.$primary;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
</style>
<div class="powered-by">
    Made with <span class="powered-by__heart">♥️</span>, netlify & svelte by <a href="https://m.rohmer.rocks">Matthias Rohmer</a>.
    <br>
    View the source code on <a href="https://github.com/mrohmer/packing.rohmer.rocks">Github</a>.
</div>
