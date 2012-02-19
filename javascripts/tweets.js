jQuery(document).ready(function () {
	 function follow(url, track) {
		track = track || [];
		// undocumented twitter URL count API.
		if (url) track = track.concat([url]);
		// normalize URLs, removing http://
		url = (url || '').replace('http://', '');
		track = _(track).chain()
		.map(function(u) { return u.replace('http://', '') })
		.uniq()
		.value();
		var remaining = track.length;
		var orig = 0;
		var external = 0;
		var graph = $('.follow .graph');
		var tweets = $('.follow .tweets');
		_(track).each(function(u) {
			var renderCount = function(resp) {
				if (u == url && resp.count) orig += resp.count;
				if (u != url && resp.count) external += resp.count;
				remaining--;
				if (remaining) return;

				$('.follow .count').text(orig);
				$('.follow .track').text(external);
				if ((orig + external) >= 100) {
					graph.addClass('maxed');
				} else if (graph.is('.bar')) {
					$('.fives', graph).addClass('fives-' + Math.floor((orig + external) * .2));
					$('.ones', graph).addClass('ones-' + ((orig + external) % 5));
				} else {
					$('.tens', graph).addClass('tens-' + Math.floor((orig + external) * .1));
					$('.ones', graph).addClass('ones-' + ((orig + external) % 10));
				}
			};
			$.ajax({
				url: 'http://urls.api.twitter.com/1/urls/count.json',
				data: { url: u },
				dataType: 'jsonp',
				success: renderCount,
				error: renderCount
			});
		});

		// https://dev.twitter.com/docs/api/1/get/search
		tweets.size() && $.ajax({
			url: 'http://search.twitter.com/search.json',
			data: { q: url, rpp:100 },
			dataType: 'jsonp',
			success: function(resp) {
				if (!resp.results.length) return;
				var template =
				"<a target='_blank' href='http://twitter.com/<%=from_user%>/status/<%=id_str%>' class='tweet'>"
				+ "<span class='thumb' style='background-image:url(<%=profile_image_url%>)'></span>"
				+ "<span class='popup'>"
				+ "<span class='title'>@<%=from_user%></span>"
				+ "<small><%=text%></small>"
				+ "</span>"
				+ "<span class='caret'></span>"
				+ "</a>";
				var t = _(resp.results.slice(0,30))
				.map(function(i) { return _(template).template(i); })
				.join('');
				tweets.html(t).addClass('loaded');
			}
		});
	};
	follow();
});