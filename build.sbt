name := "backlog-burnup"

ThisBuild / scalafixDependencies += "com.github.liancheng" %% "organize-imports" % "0.5.0"

val login = taskKey[Unit]("Login with clasp")
val push  = taskKey[Unit]("Push sources")

lazy val commonSettings = Seq(
  version := "0.1.0",
  scalaVersion := "2.13.5",
  scalacOptions ++= List(
    "-deprecation",
    "-feature",
    "-unchecked",
    "-Yrangepos",
    "-Ymacro-annotations",
    "-Ywarn-unused",
    "-Xlint",
    "-Xfatal-warnings"
  ),
  // scalafix
  addCompilerPlugin(scalafixSemanticdb),
  semanticdbEnabled := true,
  semanticdbVersion := scalafixSemanticdb.revision
)

lazy val root = (project in file("."))
  .enablePlugins(ScalaJSPlugin)
  .settings(commonSettings)
  .settings(
    libraryDependencies ++= Seq(
      "org.scala-js"   %%% "scalajs-dom"                       % "1.1.0",
      "tech.ignission" %%% "google-apps-script-scalajs-facade" % "0.4.0"
    )
  )
  .settings(
    login := Clasp.login,
    push := Clasp.push
  )

addCommandAlias("fix", "all compile:scalafix; test:scalafix")
addCommandAlias("fixCheck", "; compile:scalafix --check; test:scalafix --check")
addCommandAlias("format", "; scalafmt; test:scalafmt; scalafmtSbt")
addCommandAlias("formatCheck", "; scalafmtCheck; test:scalafmtCheck; scalafmtSbtCheck")
addCommandAlias("fixAll", "fix; format")
addCommandAlias("checkAll", "fixCheck; formatCheck")
addCommandAlias("dist", "fixAll; fastOptJS")
addCommandAlias("deploy", "dist; push")
