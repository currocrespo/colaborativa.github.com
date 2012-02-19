(function ($) {
	jQuery(document).ready(function () {
		/*-----------------------------------------------------------------------------------*/
		/*  Slides Navigation Effect
		/*-----------------------------------------------------------------------------------*/

		if (jQuery().slides) {
			jQuery("#slides").hover( function() {
				jQuery('.prev').fadeIn(200);
				jQuery('.next').fadeIn(200);
			}, function () {
				jQuery('.prev').fadeOut(200);
				jQuery('.next').fadeOut(200);
			});
		}

		$('.colaboradorIcono').live('click', function() {
			if($(this).parent().children('.subcategoryPopUp').css('display') == 'none'){
				$('.subcategoryPopUp').fadeOut('fast'); // to transparent
				$(this).parent().children('.subcategoryPopUp').fadeIn('fast'); // to opaque
			}else{
				$(this).parent().children('.subcategoryPopUp').fadeOut('fast'); // to transparent
			}
			return false;
		});

		$("body").emailSpamProtection("email");
		// Apaño para colocar el titulo de la pagina correcto cuando filtro por terminos en la pagina de proyectos
		$('#ultimoTweetInicio').jTweetsAnywhere({
			username: 'colaborativaeu',
			count: 1,
			showTweetFeed: {
				showProfileImages: false,
				showGeoLocation: false,
				showFollowButton: true,
				showConnectButton:true,
				showUserScreenNames:true,
				expandHovercards: true
			},
			tweetFeedDecorator: function(options)
			{
				// the default placeholder for the tweet feed is an unordered list
				return '<div></div>';
			},
			tweetDecorator: function(tweet, options)
			{
				// the default tweet is made of the optional user's profile image and the
				// tweet body inside a list item element
				var html = '';

				if (options._tweetFeedConfig.showProfileImages)
				{
					html += options.tweetProfileImageDecorator(tweet, options);
				}

				if (options.tweetBodyDecorator)
				{
					html += options.tweetBodyDecorator(tweet, options);
				}


				html += '';

				return '' + html + '';
			},
			tweetBodyDecorator: function(tweet, options)
			{
				// the default tweet body contains the tweet text and the tweet's creation date
				var html = '';

				if (options.tweetTextDecorator)
				{
					html += options.tweetTextDecorator(tweet, options);
				}

				if (options.tweetAttributesDecorator)
				{
					html += options.tweetAttributesDecorator(tweet, options);
				}

				return html;
			},
			tweetTextDecorator : function(tweet, options)
			{
				var tweetText = tweet.text;

				// if usernames should be visible and tweet is a native retweet, use
				// the original tweet text
				if (tweet.retweeted_status &&
					(
						options._tweetFeedConfig.showUserScreenNames ||
						options._tweetFeedConfig.showUserScreenNames == null ||
						options._tweetFeedConfig.showUserFullNames ||
						options._tweetFeedConfig.showUserFullNames == null
					)
				)
				{
					tweetText = tweet.retweeted_status.text;
				}

				// the default tweet text decorator optionally marks links, @usernames,
				// and #hashtags
				if (options.linkDecorator)
				{
					tweetText = options.linkDecorator(tweetText, options);
				}

				if (options.usernameDecorator)
				{
					tweetText = options.usernameDecorator(tweetText, options);
				}

				if (options.hashtagDecorator)
				{
					tweetText = options.hashtagDecorator(tweetText, options);
				}

				if (options._tweetFeedConfig.showUserScreenNames ||
					options._tweetFeedConfig.showUserFullNames ||
					tweet.retweeted_status &&
					(
						options._tweetFeedConfig.showUserScreenNames == null ||
						options._tweetFeedConfig.showUserFullNames == null
					)
				)
				{
					tweetText = options.tweetUsernameDecorator(tweet, options) + ' ' + tweetText;
				}

				return '<p class="tweetContenido">' + tweetText + '</p>';
			},
			tweetAttributesDecorator : function(tweet, options)
			{
				var html = '';

				if (options.tweetTimestampDecorator ||
					options.tweetSourceDecorator ||
					options.tweetGeoLocationDecorator ||
					options.tweetInReplyToDecorator ||
					(tweet.retweeted_status && options.tweetRetweeterDecorator)
				)
				{
					html += '<span class="tweetAtributos">';

					if (options.tweetTimestampDecorator)
					{
						html += options.tweetTimestampDecorator(tweet, options);
					}

					if (options.tweetSourceDecorator)
					{
						html += options.tweetSourceDecorator(tweet, options);
					}

					if (options.tweetGeoLocationDecorator)
					{
						html += options.tweetGeoLocationDecorator(tweet, options);
					}

					if (options.tweetInReplyToDecorator)
					{
						html += options.tweetInReplyToDecorator(tweet, options);
					}

					if (tweet.retweeted_status && options.tweetRetweeterDecorator)
					{
						html += options.tweetRetweeterDecorator(tweet, options);
					}

					html += '</span>';
				}

				return html;
			},
			loadingDecorator : function(options)
			{
				// the default loading decorator simply says: loading ...
				return '<p class="tweetContenido cargando">Cargando...</p>';
			},
			errorDecorator : function(errorText, options)
			{
				// the default error decorator shows the error message
				return '<p class="tweetContenido error">error: ' + errorText + '</p>';
			},
			noDataDecorator : function(options)
			{
				// the default no-data decorator simply says: No more data
				return '<p class="tweetContenido sindatos">No hay más datos</p>';
			},
			tweetTimestampDecorator : function(tweet, options)
			{
				// the default tweet timestamp decorator does a little bit of Twitter like formatting.

				// if tweet is a native retweet, use the retweet's timestamp
				var tw = tweet.retweeted_status || tweet;

				// reformat timestamp from Twitter, so IE is happy
				var createdAt = formatDate(tw.created_at);

				// format the timestamp by the tweetTimestampFormatter
				var tweetTimestamp = options.tweetTimestampFormatter(createdAt);
				var tweetTimestampTooltip = options.tweetTimestampTooltipFormatter(createdAt);

				var screenName = tw.user ? tw.user.screen_name : false || tw.from_user;
				var html =
				'<p class="tweetFecha">' +
				'<a class="tweetFecha-link" data-timestamp="' + createdAt +
				'" href="http://twitter.com/' + screenName + '/status/' + tw.id + '" target="_blank" title="' +
				tweetTimestampTooltip + '">' +
				tweetTimestamp +
				'</a>' +
				'</p>';

				return html;
			},
			tweetTimestampFormatter: function(timeStamp)
			{
				var now = new Date();

				var diff = parseInt((now.getTime() - Date.parse(timeStamp)) / 1000);

				var tweetTimestamp = '';
				if (diff < 60)
				{
					tweetTimestamp += 'hace ' + diff + ' segundo' + (diff == 1 ? '' : 's');
				}
				else if (diff < 3600)
				{
					var t = parseInt((diff + 30) / 60);
					tweetTimestamp += 'hace ' + t + ' minuto' + (t == 1 ? '' : 's');
				}
				else if (diff < 86400)
				{
					var t = parseInt((diff + 1800) / 3600);
					tweetTimestamp += 'hace ' + t + ' hora' + (t == 1 ? '' : 's');
				}
				else
				{
					var d = new Date(timeStamp);
					var period = 'AM';

					var hours = d.getHours();
					if (hours > 12)
					{
						hours -= 12;
						period = 'PM';
					}

					var mins = d.getMinutes();
					var minutes = (mins < 10 ? '0' : '') + mins;

					var monthName = [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ];

					tweetTimestamp += d.getDate() + ' de ' + monthName[d.getMonth()];

					if (d.getFullYear() < now.getFullYear())
					{
						tweetTimestamp += ', ' + d.getFullYear();
					}

					var t = parseInt((diff + 43200) / 86400);
					tweetTimestamp += ' (hace ' + t + ' día' + (t == 1 ? '' : 's') + ')';
				}

				return tweetTimestamp;
			},
			tweetInReplyToDecorator: function(tweet, options)
			{
				// if tweet is a native retweet, use the retweet's source
				var tw = tweet.retweeted_status || tweet;

				var html = '';
				if (tw.in_reply_to_status_id && tw.in_reply_to_screen_name)
				{
					html =
					'<p class="tweetInfo">' +
					' ' +
					'<a class="tweetInfo-link" href="http://twitter.com/' + tw.in_reply_to_screen_name + '/status/' + tw.in_reply_to_status_id + '" target="_blank">' +
					'respondiendo a ' + tw.in_reply_to_screen_name +
					'</a>' +
					'</p>';
				}

				return html;
			},
			tweetRetweeterDecorator: function(tweet, options)
			{
				var html = '';

				if (tweet.retweeted_status)
				{
					var screenName = tweet.user ? tweet.user.screen_name : false || tweet.from_user;
					var rtc = (tweet.retweeted_status.retweet_count || 0) - 1;

					var link =
					'<a class="tweetInfo-retweeter-link" href="http://twitter.com/' + screenName + '" target="_blank">' +
					screenName +
					'</a>';
					var rtcount = ' y ' + rtc + (rtc > 1 ? ' otros' : ' otro');
					html =
					'' +
					'<p class="tweetInfo">' +
					'Retuiteado por ' + link +
					(rtc > 0 ? rtcount : '') +
					'</p>';
				}

				return html;
			},
			tweetUsernameDecorator : function(tweet, options)
			{
				// if tweet is a native retweet, use the retweet's profile
				var t = tweet.retweeted_status || tweet;
				var screenName = t.user ? t.user.screen_name : false || t.from_user;
				var fullName = t.user ? t.user.name : null;

				var htmlScreenName;
				if (screenName && (options._tweetFeedConfig.showUserScreenNames || (options._tweetFeedConfig.showUserScreenNames == null && tweet.retweeted_status)))
				{
					htmlScreenName =
					'' +
					'<a class="nombreUsuario" href="http://twitter.com/' + screenName + '" target="_blank">' +
					screenName +
					'</a>: ' +
					'';
				}

				var htmlFullName;
				if (fullName && (options._tweetFeedConfig.showUserFullNames || (options._tweetFeedConfig.showUserFullNames == null && tweet.retweeted_status)))
				{
					htmlFullName =
					'' +
					(htmlScreenName ? ' (' : '') +
					'<a class="nombreCompleto" href="http://twitter.com/' + screenName + '" name="' + screenName + '" target="_blank">' +
					fullName +
					'</a>: ' +
					(htmlScreenName ? ')' : '') +
					'';
				}

				var html = "";

				if (htmlScreenName)
				{
					html += htmlScreenName;
				}

				if (htmlFullName)
				{
					if (htmlScreenName)
					{
						html += ' ';
					}

					html += htmlFullName;
				}

				if (htmlScreenName || htmlFullName)
				{
					html =
					'' +
					(tweet.retweeted_status ? 'RT ' : '') +
					html +
					'';
				}

				return html;
			}
		});
	});
	})(jQuery);