import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.methods({
        'getUserlandConfig': function (s_Id) {
            var data = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.landConfig;
            return data;
        },
        'getCropList': function (s_Id) {
            return Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.cropList;
        },
        'getUserProperty': function (s_Id) {
            return Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.property;
        },
        'getUnlockedCropType': function (s_Id) {
            return Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.stakeholder.unlockedCropType;
        },
        'getRanking': function () {
            var users = Meteor.users.find().fetch();
            var data = [];
            for (var i = 0; i < users.length; i++) {
                try {
                    var obj = { 'name': users[i].profile.game.stakeholder.name, 'address': users[i].profile.basic.address, 'lv': users[i].profile.game.stakeholder.level };
                    data.push(obj);
                }
                catch (e) {

                }
            }
            return data;
        },
        'getVisitNode': function (s_Id) {
            visitNode = s_Id;
            visitName = " 's farm";
            s_length = Meteor.users.find().fetch().length;
            var obj = {};
            while (visitNode == s_Id) {
                visitName = " 's farm";
                try {
                    visitNode = Math.floor(s_length * Math.random());
                    visitName = Meteor.users.findOne({ 'profile.game.stakeholder.id': visitNode }).profile.game.stakeholder.name + visitName;
                    obj = { 'id': visitNode, 'name': visitName };
                }
                catch (e) {
                    visitNode = s_Id;
                }
            }
            return obj;
        },
        'getStealRate': function (visitNode) {
            var thisGuard_s_Id = Meteor.users.findOne({ 'profile.game.stakeholder.id': visitNode }).profile.game.stakeholder.guardId;
            console.log(thisGuard_s_Id);
            var thisGuardLvl = 1;
            if (thisGuard_s_Id != -1) {
                var thisGuard = Meteor.users.findOne({ 'profile.game.stakeholder.id': thisGuard_s_Id });
                GuardMatch = thisGuard.profile.game.guardMatchId;
                mLength = Meteor.call('getMatchedLength');
                matchDiff = mLength - GuardMatch;
                if (matchDiff < 2) {
                    thisGuardLvl = thisGuard.profile.game.syndicateData.level;
                }
                else {
                    Meteor.call('updateGuardId', visitNode, -1);
                    thisGuardLvl = 1;
                }
                console.log(thisGuardLvl);
            }
            SyndicateLevel = Meteor.user().profile.game.syndicateData.level;
            stealRate = ((80 * (thisGuardLvl / 10) - 40 * (SyndicateLevel / 10)) + 32) / 100;
            return stealRate;
        },
        'getCurrentTime': function () {
            return (new Date());
        },
        'getMatchedLength': function () {
            var mLength = 0;
            try {
                mLength = matches.find().fetch().length;
            }
            catch (e) {

            }
            return mLength;
        },
        'getMatch':function(){
            return  matches.find().fetch();
        }

    });
}