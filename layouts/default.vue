<template>
  <div class="layout">
    <AwesomeHeader />
    <div class="wrapper">
      <AwesomeNavbar />
      <main>
        <slot />
      </main>
      <AwesomeSidebar />
    </div>
    <AwesomeFooter />
  </div>
</template>
