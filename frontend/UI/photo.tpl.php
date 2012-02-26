<?php include_once './UI/inc/before_body.php'; ?>
<div id="<?php echo _PAGECLASS_; ?>">
<div id="hd">
<?php include_once './UI/inc/masthead.php'; ?>
</div>
<div id="bd">
<div id="yui-main">
<div class="yui-b">
<div class="yui-g">
<div class="yui-u first">
<?php
define("API_KEY",      "000000004p");
define("SECRET_KEY",   "11a154a6e26b2e26fc4a0f7d26243bfc");
define("REDIRECT_URL", "http://josephj.com/photo.php");
define("AUTH_URL",     "http://api.staging.miiicasa.com/oauth/authorize");
define("TOKEN_URL",    "http://api.staging.miiicasa.com/oauth/access_token");
define("API_URL",      "http://api.staging.miiicasa.com/op/");

// Check if access token is valid.
$access_token  = (isset($_COOKIE["access_token"]) && $_COOKIE["access_token"] !== "") ? $_COOKIE["access_token"] : FALSE;
$refresh_token = (isset($_COOKIE["refresh_token"]) && $_COOKIE["refresh_token"] !== "") ? $_COOKIE["refresh_token"] : FALSE;
$code          = (isset($_GET["code"]) && $_GET["code"] !== "") ? $_GET["code"] : FALSE;
$state         = (isset($_GET["state"]) && $_GET["state"] !== "") ? $_GET["state"] : FALSE;
if ( ! $access_token)
{
    if ($code && $state)
    {
        $ch = curl_init();
        $fields = array(
            "grant_type=authorization_code",
            "code=" . $code,
            "client_id=" . API_KEY,
            "client_secret=" . SECRET_KEY,
            "redirect_uri=" . REDIRECT_URL,
        );
        curl_setopt($ch, CURLOPT_URL, TOKEN_URL);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, implode($fields, "&"));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ch);
        $result = json_decode($result, TRUE);
        $access_token  = $result["access_token"];
        $refresh_token = $result["refresh_token"];
        setcookie("access_token", $result["access_token"], time() + 3600);
        setcookie("refresh_token", $result["refresh_token"], time() + 3600);
    }
    else
    {
        $auth_url = AUTH_URL . "?client_id=" . API_KEY . "&response_type=code&redirect_uri=" . REDIRECT_URL . "&scope=user_space&state=true";
        header("Location: " . $auth_url);
    }
}
$query = "access_token={$access_token}";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, API_URL . "space/getDeviceList?" . $query);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$result = curl_exec($ch);
$result = json_decode($result, TRUE);
if ($result["status"] !== "ok")
{
    setcookie("access_token", "");
    setcookie("refresh_token", "");
    header("Location: /photo.php");
}
$devices = $result["devices"];
foreach ($devices as $device)
{
    $device_id = $device["device_id"];
    echo "<h2>$device_id</h2>";

    // Get storages.
    $result = "";
    $query = "access_token={$access_token}&device_id={$device_id}";
    curl_setopt($ch, CURLOPT_URL, API_URL . "space/getStorageList?" . $query);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    echo $result;
    $result = json_decode($result, TRUE);

}

curl_close($ch);
?>
</div>
</div>
</div>
</div>
<div id="ft">
<?php include_once './UI/inc/mastfoot.php'; ?>
</div>
</div>
<?php include_once './UI/inc/after_body.php'; ?>
