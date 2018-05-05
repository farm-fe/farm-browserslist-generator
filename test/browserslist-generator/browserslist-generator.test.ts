import test from "ava";
import {browsersWithoutSupportForFeatures, browsersWithSupportForFeatures, matchBrowserslistOnUserAgent} from "../../src/browserslist-generator/browserslist-generator";

test("browsersWithSupportForFeatures() => Will skip 'Android' in the generated browserslist", t => {
	t.true(!browsersWithSupportForFeatures(
		"es6-module",
		"shadowdomv1",
		"custom-elementsv1"
	).some(part => part.includes("android")));
});

test("browsersWithSupportForFeatures() => Won't include Samsung 6.2 for es6-modules", t => {
	t.true(!browsersWithSupportForFeatures(
		"es6-module",
		"shadowdomv1",
		"custom-elementsv1"
	).some(part => part.toLowerCase().includes("samsung")));
});

test("browsersWithoutSupportForFeatures() => Will include all browsers that simply has no support for the given features at all", t => {
	t.true(browsersWithoutSupportForFeatures(
		"es6-module",
		"shadowdomv1",
		"custom-elementsv1"
	).some(part => part.includes("ie")));
});

test("matchBrowserslistOnUserAgent() => Will not match Firefox > 54 for a Firefox v54 user agent", t => {
	t.false(matchBrowserslistOnUserAgent("Mozilla/5.0 (Windows NT 10.0; rv:54.0) Gecko/20100101 Firefox/54.0", ["Firefox > 54"]));
});

test("matchBrowserslistOnUserAgent() => Will match Firefox >= 54 for a Firefox v54 user agent", t => {
	t.true(matchBrowserslistOnUserAgent("Mozilla/5.0 (Windows NT 10.0; rv:54.0) Gecko/20100101 Firefox/54.0", ["Firefox >= 54"]));
});

// @ts-ignore
import * as Browserslist from "browserslist";
const features = ["input-color"];
const supportResult = browsersWithSupportForFeatures(...features);
const noSupportResult = browsersWithoutSupportForFeatures(...features);
console.log("RAW SUPPORT:", supportResult);
console.log("GENERATED SUPPORT:", JSON.stringify(Browserslist(supportResult), null, " "));
console.log("RAW NO SUPPORT:", noSupportResult);
console.log("GENERATED NO SUPPORT:", JSON.stringify(Browserslist(noSupportResult), null, " "));