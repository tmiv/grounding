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

    // Input property for the image source
    export let imageUrl;
    // Optional input for alt text
    export let altText = "";
    // Optional input for the text content
    export let text = "";

    export let separatorColor = "#666";

    export let navigate;

    let numberColor;
    let senseColor;

    function adjustColorValue(hexColor, percentageDecrease) {
        hexColor = hexColor.replace("#", "");

        // Convert hex to RGB
        let r = parseInt(hexColor.substr(0, 2), 16);
        let g = parseInt(hexColor.substr(2, 2), 16);
        let b = parseInt(hexColor.substr(4, 2), 16);

        // Apply brightness adjustment to each component
        const factor = 1 - percentageDecrease / 100;
        r = Math.round(r * factor);
        g = Math.round(g * factor);
        b = Math.round(b * factor);

        // Ensure values stay within valid range
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        // Convert back to hex
        const rHex = r.toString(16).padStart(2, "0");
        const gHex = g.toString(16).padStart(2, "0");
        const bHex = b.toString(16).padStart(2, "0");

        return `#${rHex}${gHex}${bHex}`;
    }

    function eatkey() {
    }

    $: numberColor = adjustColorValue(separatorColor, 50);
    $: senseColor = adjustColorValue(separatorColor, 50);
</script>

<div class="container">
    {#key imageUrl}
        <div class="image-wrapper bounce-from-top">
            <img src={imageUrl} alt={altText} />
        </div>
    {/key}
    <div class="separator" style="--separator-color: {separatorColor}">
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="nav-button left"
            style="--separator-color: {separatorColor}"
            on:click={() => navigate(-1)}
            on:keyup={eatkey}
            aria-label="prev"
        >
        <svg viewBox="0 0 80 80" class="nav-svg">
            <path d="m36.37,40l41.09,-39.5l-42.39,0l-34.64,39.5l34.64,39.28l42.47,0.22l-41.17,-39.5z" fill={numberColor} id="svg_1"/>
        </svg>
        </div>
        <div class="spacer"></div>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="nav-button right"
            style="--separator-color: {separatorColor}"
            on:keyup={eatkey}
            on:click={() => navigate(1)}>
            <svg viewBox="0 0 80 80" class="nav-svg">
                <path d="m36.37,40l41.09,-39.5l-42.39,0l-34.64,39.5l34.64,39.28l42.47,0.22l-41.17,-39.5z" fill={numberColor} 
                transform="rotate(-180, 40, 40)" id="svg_2"/>
            </svg>
        </div
        >
    </div>
    {#key imageUrl}
        <p
            class="bounce-from-bottom"
            style="--number-color: {numberColor}; --sense-color: {senseColor};"
        >
            {@html text}
        </p>
    {/key}
</div>

<style>
    :global(number) {
        color: var(--number-color);
        font-size: 125%;
    }

    :global(sense) {
        color: var(--sense-color);
        font-size: 135%;
    }

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0;
        box-sizing: border-box;
    }

    .image-wrapper {
        position: relative;
        z-index: 2;
        margin-bottom: -18vh;
        pointer-events: none;
    }

    img {
        height: 40vh;
        width: 40vh;
        object-fit: contain;
        filter: drop-shadow(-10px 10px 3px rgba(0, 0, 0, 0.6));
    }

    .separator {
        position: relative;
        z-index: 1; /* Place separator below image */
        width: 100%;
        height: 10vh;
        background: linear-gradient(
            to bottom,
            transparent,
            var(--separator-color) 3%,
            var(--separator-color) 97%,
            transparent
        );
        display: flex;
        flex-direction: row;
    }

    p {
        margin: 0;
        text-align: center;
        font-size: clamp(1rem, 3vw, 1.5rem);
    }

    .bounce-from-top {
        animation: bounceTop 1s ease-out;
        animation-name: bounceTop;
    }

    .bounce-from-bottom {
        margin-top: 5vh;
        padding: 2em;
        animation: bounceBottom 1s ease-out;
        animation-name: bounceBottom;
    }

    @keyframes bounceTop {
        0% {
            transform: translateY(-100vh);
        }
        70% {
            transform: translateY(30px);
        }
        85% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes bounceBottom {
        0% {
            transform: translateY(100vh);
        }
        70% {
            transform: translateY(-30px);
        }
        85% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .nav-button {
        border: none;
        width: 50%;
        height: 100%;
        font-size: 24px;
        background: var(--separator-color);
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        align-items: center;
        cursor: pointer;
        z-index: 3;
    }

    .left {
        justify-content: left;
        left: 20px;
    }

    .right {
        justify-content: right;
        right: 20px;
    }

    .nav-svg {
        height: 100%
    }

    .spacer {
        flex-grow: 1;
    }
</style>
