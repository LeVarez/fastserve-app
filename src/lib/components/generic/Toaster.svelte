<script lang="ts" context="module">

  interface Options {
    durationMs: number;
    type: 'info' | 'error' | 'done';
  }

  type Message = {
    id: number;
    text: string;
    type: Options['type']
  };

  const DEFAULT_OPTIONS: Options = {
    durationMs: 5000,
    type: 'info'
  };

  let id = 0;

</script>
<script lang="ts">

  let messages: Message[] = [];

  export function addMessage(text: string, opts: Partial<Options> = {}) {
    const { type, durationMs } = { ...DEFAULT_OPTIONS, ...opts };
    const message = { id: id++, text, type };
    messages = [message, ...messages];
    window.setTimeout(() => messages = messages.filter(m => m !== message) , durationMs);
  }

</script>

<div class="toaster">
  {#each messages as message (message.id)}
    <div class="message" data-type={message.type}>
      <div class="material-icons">{message.type}</div>
      {message.text}
    </div>
  {/each}
</div>


<style lang="stylus">
  .toaster {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: toast;
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  @keyframes animateToast {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  .message {
    color: #333;
    border-radius: 5px;
    border: 1px solid #999;
    background: white;
    padding: 10px 15px 10px 10px;
    display: flex;
    align-items: center;
    column-gap: 5px;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
    animation: animateToast 100ms;

    &[data-type="error"] .material-icons {
      color: red;
    }

    &[data-type="info"] .material-icons {
      color: #666;
    }
    &[data-type="done"] .material-icons {
      color: rgb(35, 106, 47);
    }
  }

</style>