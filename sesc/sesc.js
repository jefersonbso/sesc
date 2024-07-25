document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.video-container').forEach(container => {
        const video = container.querySelector('video');
        const button = container.querySelector('.play-pause-btn');

        // Preview on load
        video.addEventListener('loadeddata', () => {
            video.currentTime = 0;
            video.play();
            setTimeout(() => {
                video.pause();
                video.currentTime = 0;
            }, 5000); // 5-second preview
        });

        // Play/Pause button functionality
        button.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                button.textContent = '⏸️';
                video.classList.add('jump-in');
                setTimeout(() => {
                    video.classList.remove('jump-in');
                }, 500); // Duration of the jump-in animation
            } else {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('fade-in');
                video.classList.add('fade-out');
                button.textContent = '▶️';
            }
        });

        // Fullscreen on play
        video.addEventListener('play', async () => {
            video.classList.remove('fade-out');
            video.classList.add('fade-in');
            video.classList.add('jump'); // Add jump effect on play
            setTimeout(async () => {
                try {
                    if (video.requestFullscreen) {
                        await video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) { /* Safari */
                        await video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) { /* IE11 */
                        await video.msRequestFullscreen();
                    }
                } catch (error) {
                    console.error('Failed to enter fullscreen mode:', error);
                }
            }, 100); // Delay to ensure fade-in completes before entering fullscreen
        });

        // Exit fullscreen, slide out and reset on end
        video.addEventListener('ended', async () => {
            video.classList.remove('fade-in');
            video.classList.add('fade-out');
            setTimeout(() => {
                video.classList.add('slide-out');
                setTimeout(() => {
                    video.currentTime = 0;
                    video.pause();
                    button.textContent = '▶️';
                    video.classList.remove('slide-out');
                    try {
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        } else if (document.webkitFullscreenElement) { /* Safari */
                            document.webkitExitFullscreen();
                        } else if (document.msFullscreenElement) { /* IE11 */
                            document.msExitFullscreen();
                        }
                    } catch (error) {
                        console.error('Failed to exit fullscreen mode:', error);
                    }
                }, 500); // Duration of the slide-out animation
            }, 1000); // Delay to ensure fade-out completes before resetting video
        });
    });

    // Adding the jumping effect for footer logos
    const footerLogos = document.querySelectorAll('.footer-logos img');
    setInterval(() => {
        footerLogos.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('jump');
                setTimeout(() => {
                    img.classList.remove('jump');
                }, 1000); // Remove the class after 1 second
            }, index * 500); // Stagger the jumps slightly
        });
    }, 30000); // Repeat every 30 seconds
});
