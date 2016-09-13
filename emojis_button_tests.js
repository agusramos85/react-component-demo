define(function(require) {
	"use strict";
	/* globals QUnit */
	var EmojisButton = require("require-jsx/jsx!./emojis_button");
	var React = require("React");
	var TestUtils = React.addons.TestUtils;

	var component;

	QUnit.module("publishing/n2p/components/emojis-component", {
		setup: function() {
			component = TestUtils.renderIntoDocument(React.createElement(EmojisButton));
		}
	});

	QUnit.test("check show menu initial state", function(assert) {
		assert.strictEqual(component.props.showMenuInitialState, false);
	});

	QUnit.test("check popOverStyle state", function(assert) {
		assert.propEqual(component.props.popOverStyle, {});
	});

	QUnit.test("set popOverStyle params", function(assert) {
		var popOverStyleParams = {
			right: 5
		};
		component = TestUtils.renderIntoDocument(React.createElement(EmojisButton, {popOverStyle: popOverStyleParams}));
		assert.propEqual(component.props.popOverStyle, popOverStyleParams);
	});

	QUnit.test("render emojis button", function(assert) {
		var emojisButton = TestUtils.scryRenderedDOMComponentsWithClass(component, "emojisToogleButton");
		assert.strictEqual(emojisButton.length, 1);
	});

	QUnit.test("click emojis button and set show menu true", function(assert) {
		var componentElement = React.findDOMNode(component);
		var emojisButton = componentElement.querySelector(".emojisToogleButton");
		TestUtils.Simulate.mouseDown(emojisButton);
		assert.strictEqual(component.state.showMenu, true);
	});

	QUnit.test("click emojis button and display popover", function(assert) {
		var componentElement = React.findDOMNode(component);
		var emojisButton = componentElement.querySelector(".emojisToogleButton");
		TestUtils.Simulate.mouseDown(emojisButton);
		var emojisPopOver = componentElement.querySelector(".popover");
		assert.strictEqual(emojisPopOver.style.display, "block");
	});

	QUnit.test("popover not shown if no click on emojis button", function(assert) {
		var componentElement = React.findDOMNode(component);
		var emojisPopOver = componentElement.querySelector(".popover");
		assert.strictEqual(emojisPopOver.style.display, "none");
	});
});
