<script lang="ts">
	import { onMount } from 'svelte';
	import './admin.css';

	onMount(async () => {
		await import('netlify-cms');

		function b(a) {
			return a
				? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
				: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
		}

		// eslint-disable-next-line no-undef
		var UUIDControl = createClass({
			handleChange: function (value) {
				this.props.onChange(value ? value.trim() : b());
			},

			render: function () {
				var value = this.props.value ? this.props.value : b();
				this.handleChange(value);
				// eslint-disable-next-line no-undef
				return h('div', { style: { float: 'right', marginRight: '4px' } }, value);
			}
		});

		// eslint-disable-next-line no-undef
		var UUIDPreview = createClass({
			render: function () {
				// eslint-disable-next-line no-undef
				return h('div', {}, this.props.value);
			}
		});

		var schema = {
			properties: {}
		};

		// eslint-disable-next-line no-undef
		CMS.registerWidget('uuid', UUIDControl, UUIDPreview, schema);
	});
</script>
