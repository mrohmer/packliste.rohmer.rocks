export const getBackend = () => ({
	name: 'github',
	repo: 'mrohmer/packing.rohmer.rocks',
	branch: 'master',
	commit_messages: {
		create: 'content({{collection}}): created {{slug}}',
		update: 'content({{collection}}): updated {{slug}}',
		delete: 'content({{collection}}): deleted {{slug}}',
		uploadMedia: 'content(media): uploaded {{path}}',
		deleteMedia: 'content(media): deleted {{path}}',
		openAuthoring: 'content: {{message}}'
	}
});
