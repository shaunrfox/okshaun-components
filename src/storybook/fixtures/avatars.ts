// Local avatar images for stories. Visual tests snapshot these stories, so
// the images must load from the repo, not a remote service: a slow or failed
// request would change the snapshot without a code change. Importing them
// also puts the files in Vite's module graph, so `vitest --changed` reruns
// the stories that use them.
import user1 from './avatars/user-1.svg';
import user2 from './avatars/user-2.svg';
import user3 from './avatars/user-3.svg';
import user4 from './avatars/user-4.svg';
import user5 from './avatars/user-5.svg';

export const sampleAvatars = { user1, user2, user3, user4, user5 };
