import facade.googleappsscript.GoogleAppsScript
import facade.googleappsscript.html.HtmlOutput
import org.scalajs.dom
import org.scalajs.dom.document

import scala.scalajs.js
import scala.scalajs.js.annotation._

trait Config extends js.Object {
  val space: js.UndefOr[String]      = js.undefined
  val domain: js.UndefOr[String]     = js.undefined
  val apiKey: js.UndefOr[String]     = js.undefined
  val projectKey: js.UndefOr[String] = js.undefined
}

object Main {

  @JSExportTopLevel("doGet")
  def doGet(): HtmlOutput =
    GoogleAppsScript.HtmlService.createTemplateFromFile("index").evaluate()

  @JSExportTopLevel("getConfig")
  def getConfig(): Config = {
    val properties = GoogleAppsScript.PropertiesService.getUserProperties()

    new Config {
      override val space      = properties.getProperty("space")
      override val domain     = properties.getProperty("domain")
      override val apiKey     = properties.getProperty("apiKey")
      override val projectKey = properties.getProperty("projectKey")
    }
  }

  def appendPar(targetNode: dom.Node, text: String): Unit = {
    val parNode = document.createElement("p")
    parNode.textContent = text
    targetNode.appendChild(parNode)
  }

  @JSExportTopLevel("addClickedMessage")
  def addClickedMessage(): Unit = {
    appendPar(document.body, "You clicked the button!")
  }

  // @JSExportTopLevel("onClick")
  // def onCl

  @JSExportTopLevel("start")
  def start(obj: js.Any): Unit =
    js.Dynamic.global.console.log(obj.toString)

  @JSExportTopLevel("onLoadHandler")
  def onLoadHandler(): Unit = {
    val webPageLoadedMessage = "Web page loaded successfully."
    dom.window.alert(webPageLoadedMessage)
  }
  // @JSExportTopLevel("onOpenImpl")
  // def onOpen(): Unit = {
  //   SpreadsheetApp
  //     .getUi()
  //     .createMenu("Backlog")
  //     .addItem("Step-1: Init", "init")
  //     // .addItem("Step-2: Run", "run")
  //     .addToUi()
  // }

  // @JSExportTopLevel("init")
  // def init(): Unit =
  //   throw new Exception("init!")

}
