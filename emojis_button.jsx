define(function(require) {
	"use strict";

	var _ = require("underscore/underscore");
	var EmojisEntities = require("es6!publishing/n2p/components/emojis_data");
	var Popover = require("require-jsx/jsx!spredfast/components/popover");
	var React = require("React");

	var buttonStyles = {
		cursor: "pointer",
		display: "inline-block",
		background: "none",
		border: "none",
	};
	var emojisListStyles = {
		cursor: "pointer",
		display: "inline-block",
		width: 20,
	};
	var popOverDefaultStyles = {
		width: 192,
		height: 77,
		border: "1px solid #eee",
		borderRadius: 5,
		paddingTop: 2,
		"float": "left",
		marginTop: -75,
		marginRight: 5,
		position: "relative",
		paddingLeft: 5,
	};
	var SMILE_TOOGLE_BUTTON = "\u{1F601}";

	class EmojiMenuToggleButton extends React.Component {
		constructor(props) {
			super(props);
			this.state  = {showMenu: props.showMenuInitialState};
		}

		toggleMenu(e) {
			if (e !== undefined) {e.stopPropagation();}
			this.setState({showMenu: !this.state.showMenu});
		}

		callOnSelect(emoji) {
			this.props.onSelect(emoji);
			this.toggleMenu();
		}

		render() {
			var popOverStyles = _.extend(popOverDefaultStyles, this.props.popOverStyle);
			var emojisListComponent = EmojisEntities.map((emoji, i) => {
				return (
					<span key={i} onMouseDown={()=> this.callOnSelect(emoji)} style={emojisListStyles}>{emoji}</span>
				);
			}, this);

			return (
				<div>
					<button className="emojisToogleButton" onMouseDown={this.toggleMenu.bind(this)} style={buttonStyles}>{SMILE_TOOGLE_BUTTON}</button>
					<Popover open={this.state.showMenu} style={popOverStyles}>
						{emojisListComponent}
					</Popover>
				</div>
			);
		}
	}

	EmojiMenuToggleButton.displayName = "EmojiMenuToggleButton";
	EmojiMenuToggleButton.propTypes = {
		popOverStyle: React.PropTypes.object,
		showMenuInitialState: React.PropTypes.bool,
		onSelect: React.PropTypes.func,
	};
	EmojiMenuToggleButton.defaultProps = {
		showMenuInitialState: false,
		popOverStyle: {},
		onSelect: function() {},
	};

	return EmojiMenuToggleButton;
});
