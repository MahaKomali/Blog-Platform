document.addEventListener('DOMContentLoaded', () => {
    const postsDiv = document.getElementById('posts');
    const noPostsDiv = document.getElementById('no-posts');
    const postForm = document.getElementById('postForm');
    const successMessage = document.getElementById('successMessage');

    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
       
        if (posts.length === 0) {
            if (postsDiv) postsDiv.style.display = 'none';
            if (noPostsDiv) noPostsDiv.style.display = 'block';
        } else {
            if (postsDiv) postsDiv.style.display = 'block';
            if (noPostsDiv) noPostsDiv.style.display = 'none';
            if (postsDiv) postsDiv.innerHTML = '';
           
            posts.forEach((post, index) => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
               
                const titleElement = document.createElement('h3');
                titleElement.textContent = post.title;
                titleElement.style.cursor = 'pointer';

                const nameElement = document.createElement('p');
                nameElement.textContent = `By: ${post.name}`;

                const contentElement = document.createElement('p');
                contentElement.innerHTML = post.content.replace(/<br>/g, '\n');
                contentElement.style.display = 'none';

                const imageElement = document.createElement('img');
                imageElement.src = post.image;
                imageElement.className = 'post-image';

                titleElement.addEventListener('click', () => {
                    contentElement.style.display = contentElement.style.display === 'none' ? 'block' : 'none';
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-button';
                deleteButton.addEventListener('click', () => {
                    deletePost(index);
                });

                postDiv.appendChild(titleElement);
                postDiv.appendChild(nameElement);
                postDiv.appendChild(imageElement);
                postDiv.appendChild(contentElement);
                postDiv.appendChild(deleteButton);
               
                if (postsDiv) postsDiv.appendChild(postDiv);
            });
        }
    };

    const savePost = (name, title, content, image) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const escapedContent = content.replace(/\n/g, '<br>');
        posts.push({ name, title, content: escapedContent, image });
        localStorage.setItem('posts', JSON.stringify(posts));
        successMessage.textContent = 'Post added successfully!';
        setTimeout(() => {
            window.location.href = './view-posts.html';
        }, 2000);
    };

    const deletePost = (index) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    };

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const imageInput = document.getElementById('image');
            const reader = new FileReader();

            reader.onload = function(event) {
                const image = event.target.result;
                savePost(name, title, content, image);
                postForm.reset();
            };

            reader.readAsDataURL(imageInput.files[0]);
        });
    }

    window.addEventListener('popstate', () => {
        window.location.href = 'index.html';
    });

    loadPosts();
});
