<script>
/*
 * Grounding - A 54321 grounding exercise application
 * Copyright (C) 2025 [Thomas Miller IV]
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */

  import i18next from './i18n/i18n';
  import SenseElement from "./components/SenseElement.svelte"
  let deferredPrompt;
  let installable = false;
  let activeSense = 0;

  const senses = [
    {
      imageUrl: "eye.png",
      altText: i18next.t('senses.see.alt'),
      text: i18next.t('senses.see.text'), 
      separatorColor: i18next.t('senses.see.color'), 
    },
    {
      imageUrl: "touch.png",
      altText: i18next.t('senses.touch.alt'),
      text: i18next.t('senses.touch.text'), 
      separatorColor: i18next.t('senses.touch.color'), 
    },
    {
      imageUrl: "ear.png",
      altText: i18next.t('senses.hear.alt'),
      text: i18next.t('senses.hear.text'), 
      separatorColor: i18next.t('senses.hear.color'), 
    },
    {
      imageUrl: "nose.png",
      altText: i18next.t('senses.smell.alt'),
      text: i18next.t('senses.smell.text'), 
      separatorColor: i18next.t('senses.smell.color'), 
    },
    {
      imageUrl: "taste.png",
      altText: i18next.t('senses.taste.alt'),
      text: i18next.t('senses.taste.text'), 
      separatorColor: i18next.t('senses.taste.color'), 
    }
  ];


  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to show install button
    installable = true;
  });

  async function installPWA() {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    installable = false;
  }

  function navigate(direction) {
    activeSense = (activeSense + direction + senses.length) % senses.length;
  }

  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    var swipeDistance =  0;
    var swipeMult =  0;
    if( Math.abs(touchEndY-touchStartY) > Math.abs(touchEndX - touchStartX) ) {
      swipeDistance = touchEndY - touchStartY;
      swipeMult = parseInt(i18next.t('updownswipe'))  
    } else {
      swipeDistance = touchEndX - touchStartX;
      swipeMult = parseInt(i18next.t('leftrightswipe'))  
    }

    if (Math.abs(swipeDistance) > 50) {
      navigate(Math.sign(swipeMult * swipeDistance))
    }
  }

  function handleContextMenu(event) {
    event.preventDefault();
  }

</script>

<main
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchmove|preventDefault
  on:wheel|preventDefault
  on:contextmenu={handleContextMenu}
>
  <SenseElement {...senses[activeSense]} navigate={navigate}/>
  {#if installable}
    <button on:click={installPWA}>{i18next.t('installapp')}</button>
  {/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  button:hover {
    background-color: #45a049;
  }


</style>
