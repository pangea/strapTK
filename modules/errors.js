/* Sprocket Manifest
 *= require Extend
 */
var TooManyChildrenError  = Extend(Error, {message: "Too many children.", name: "TooManyChildrenError"}),

    WebsocketConnectError = Extend(Error, {message: "Unable to connect via websocket.", name: "WebsocketConnectError"});