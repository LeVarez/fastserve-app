<script lang="ts">
  import { session } from "$app/stores";
  import ControlMenu from "$lib/components/ControlMenu.svelte";
  import Icon from "$lib/components/generic/Icon.svelte";

</script>
<div class="top-nav">
{#if $session.user === undefined}
  <a href="/api/auth/signin/google">
    <div class="login-button" href="/api/auth/signin/google">
        <div class="icon">
          <Icon icon="google"/>
        </div>
        Sign in with Google
    </div>
  </a>
  
{:else}
 
    <div class="top-nav-user">
      Logged in as {$session.user.name}
      <a href="/api/auth/signout">Signout</a>
    </div>	
    <ControlMenu />

{/if}
</div>
<slot/>

<style lang="stylus">
  :global(body){
    background-color: #EBEBEB;
  }
  .top-nav{
    height: 50px;
    padding: 0 20px;
  }
  .top-nav-user{
    display: flex;
    flex-direction: column;
    align-items: center;
    float: right;
  }
  .icon {
    float: left;
    width: 36px;
    height: 36px;
    margin: 4px 7px;
    z-index: 2;
  }
  .login-button{
    width: 200px;
    background: #FCFCFC;
    border-radius: 1;
    height: 45px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    float: right;
    cursor: pointer;
     
      display: flex;
      align-items: center;
      justify-content: center;
    
  }
</style>